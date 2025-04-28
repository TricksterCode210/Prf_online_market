import {Component, OnInit} from '@angular/core'
import {Button} from 'primeng/button'
import {FloatLabel} from 'primeng/floatlabel'
import {InputText} from 'primeng/inputtext'
import {NgForOf} from '@angular/common'
import {RadioButton} from 'primeng/radiobutton'
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import {TextareaModule} from 'primeng/textarea'
import {InputNumberModule} from 'primeng/inputnumber'
import {FileUpload} from 'primeng/fileupload'
import {ProductService} from '../shared/services/product.service'
import {Card} from 'primeng/card'
import {Product} from '../shared/model/Product'

@Component({
  selector: 'app-sell',
  imports: [
    Button,
    FloatLabel,
    InputText,
    NgForOf,
    RadioButton,
    ReactiveFormsModule,
    TextareaModule,
    InputNumberModule,
    FileUpload,
    Card
  ],
  providers: [],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss',
  standalone:true
})
export class SellComponent implements OnInit
{
  productForm!: FormGroup;
  products!: Product[];
  selectedFile!: File | null;   // <-- Hozzáadva: hogy elmentsd a kiválasztott képet

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  )
  {
  }

  ngOnInit()
  {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      imageSrc: [null],  // <-- változtatás: nem üres lista [] hanem null
      username: ['']
    });

    this.authService.loggedInUser().subscribe(user => {
      if (user) {
        this.productForm.patchValue({ username: user.username });
        this.productService.getAllProductsByUser(user.username).subscribe({
          next: (data) => {
            this.products = data
          }, error: (err) => {
            console.log(err)
          }
        })
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];  // csak az elsőt vesszük
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('username', this.productForm.get('username')?.value);

      if (this.selectedFile) {
        formData.append('imageSrc', this.selectedFile);  // <-- a fájlt adod hozzá
      }

      this.productService.sell(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/buy');
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      console.log("Nem valid a form!");
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
