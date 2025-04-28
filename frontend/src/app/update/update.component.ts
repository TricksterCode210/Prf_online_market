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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
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
      console.log("Form data: ", this.productForm.value);
      this.productService.updateProduct(this.productForm.value, productId).subscribe({
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
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        imageSrc: file
      });
      this.productForm.get('imageSrc')?.updateValueAndValidity();
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
