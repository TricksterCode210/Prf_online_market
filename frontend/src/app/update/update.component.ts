import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {Button} from 'primeng/button'
import {FloatLabel} from 'primeng/floatlabel'
import {InputText} from 'primeng/inputtext'
import {NgForOf} from '@angular/common'
import {RadioButton} from 'primeng/radiobutton'
import {TextareaModule} from 'primeng/textarea'
import {InputNumberModule} from 'primeng/inputnumber'
import {Router} from '@angular/router'
import {ProductService} from '../shared/services/product.service'
import {AuthService} from '../shared/services/auth.service'

@Component({
  selector: 'app-update',
  imports: [
    Button,
    FloatLabel,
    InputText,
    NgForOf,
    RadioButton,
    ReactiveFormsModule,
    TextareaModule,
    InputNumberModule,
  ],
  standalone: true,
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  productForm!: FormGroup
  selectedFile!: File | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  )
  {
  }

  ngOnInit() {
    const productId = this.router.url.split('/')[2]
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      imageSrc: [],
      username: ['']
    });

    this.productService.getProduct(productId).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        description: product.name,
        price: product.price,
        imageSrc: product.imageSrc,
        username: product.username
      })
    })
  }

  onSubmit() {
    const productId = this.router.url.split('/')[2]
    if(this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('username', this.productForm.get('username')?.value);
      formData.append('state', 'ACTIVE');

      if (this.selectedFile) {
        formData.append('imageSrc', this.selectedFile);
      }

      this.productService.updateProduct(formData, productId).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigateByUrl('/sell')
        }, error: (err) => {
          console.log(err)
        }
      })
    } else {
      console.log("Ezt a rendelést nem tudja módosítani")
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];  // csak az elsőt vesszük
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
