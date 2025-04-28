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
import {map, of} from 'rxjs'
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
  products!: Product[]

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private productService: ProductService,
      private authService: AuthService
  )
  {
  }

  onSubmit() {
    if(this.productForm.valid) {
      console.log("Form data: ", this.productForm.value);
      this.productService.sell(this.productForm.value).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigateByUrl('/buy')
        }, error: (err) => {
          console.log(err)
        }
      })
    } else {
      console.log("Ezt a rendelést nem tudja feladni")
    }
  }

  ngOnInit()
  {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      imageSrc: [],
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

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
