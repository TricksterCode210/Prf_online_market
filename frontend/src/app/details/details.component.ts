import { Component } from '@angular/core';
import {Product} from '../shared/model/Product'
import {ProductService} from '../shared/services/product.service'
import {Router, RouterLink} from '@angular/router'
import {NgIf} from '@angular/common'
import {Button} from 'primeng/button'
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {OrderService} from '../shared/services/order.service'
import {FloatLabel} from 'primeng/floatlabel'
import {InputText} from 'primeng/inputtext'
import {Textarea} from 'primeng/textarea'
import {InputNumber, InputNumberModule} from 'primeng/inputnumber'
import {Image} from 'primeng/image'

@Component({
  selector: 'app-details',
  imports: [
    NgIf,
    Button,
    FloatLabel,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Textarea,
    RouterLink,
    InputNumber,
    InputNumberModule,
    Image
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true
})
export class DetailsComponent {
  product!: Product;
  orderForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService
  )
  {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      buyerName: [''],
      sellerName: [''],
      productName: [''],
      price: [''],
      shippingAddress: [''],
      imageSrc: [null],
      productId: ['']
    })

    this.authService.loggedInUser().subscribe(user => {
      if (user) {
        this.orderForm.patchValue({ buyerName: user.username, shippingAddress: user.address });
      }
    });

    const productId = this.router.url.split('/')[2]
    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.orderForm.patchValue({ productName: data.name, price: data.price, imageSrc: data.imageSrc, sellerName: data.username, productId: data._id })
        this.product = data
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  buyingProduct() {
    this.productService.changeState(this.product._id, 'INACTIVE').subscribe({
      next: (data) => {
        console.log("Sikeres vásárlás")
        this.makeOrder()
      }, error: (err) => {
        console.log("Sikertelen vásárlás: " + err)
      }
    })
  }

  makeOrder() {
    this.orderService.makeOrder(this.orderForm.value).subscribe({
      next: (data) =>
      {
        console.log("Sikeres mentés")
        this.navigate("/buy")
      }, error: (err) => {
        console.log("Sikertelen mentés: " + err.toString())
      }
    })
  }

  navigate(to: string) {
    this.router.navigateByUrl(to)
  }

}
