import {Component, OnInit} from '@angular/core'
import {Order} from '../shared/model/Order'
import {OrderService} from '../shared/services/order.service'
import {TableModule} from 'primeng/table'
import {TagModule} from 'primeng/tag'
import {Image} from 'primeng/image'
import {Button} from 'primeng/button'
import {FormBuilder, FormGroup} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import {ShippingService} from '../shared/services/shipping.service'
import {ProductService} from '../shared/services/product.service'

@Component({
  selector: 'app-orders',
  imports: [TableModule, TagModule, Image, Button],
  standalone:true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders!: Order[]
  shippingForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private shippingService: ShippingService,
    private productService: ProductService
    ){}

  ngOnInit()
  {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() +7);
    this.shippingForm = this.formBuilder.group({
      from: [''],
      to: [''],
      buyer: [''],
      seller: [''],
      arrivalFirst: [threeDaysLater.toISOString().substring(0, 10)],
      arrivalLast: [sevenDaysLater.toISOString().substring(0, 10)],
      productName: [''],
    })

    this.authService.loggedInUser().subscribe(user => {
      if (user) {
        this.shippingForm.patchValue({ seller: user.username, to: user.address });
      }
    });

    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data
      }, error: (err) => {
        console.log("Hiba történt: " + err)
      }
    })
  }

  deleteOrder(id: string)
  {
    this.orderService.deleteOrder(id).subscribe({
      next: (data) => {
        this.activateProduct(id)
        console.log("Sikeres vásárlás")
      }, error: (err) => {
        console.log("Sikertelen vásárlás: " + err)
      }
    })
  }

  shipOrder(id:string)
  {
    const order = this.orders.find(order =>order._id === id)
    this.shippingForm.patchValue({
      from: order?.shippingAddress,
      buyer: order?.buyerName,
      productName: order?.productName
    });
    this.orderService.deleteOrder(id).subscribe({
      next: (data) => {
        this.deleteProduct(order?.productId)
        this.makeShipping()
        console.log("Sikeres vásárlás")
      }, error: (err) => {
        console.log("Sikertelen vásárlás: " + err)
      }
    })
  }

  deleteProduct(productId: string | undefined){
    this.productService.deleteProduct(productId).subscribe({
      next: (data) => {
        console.log("Sikeres törlés")
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  makeShipping() {
    this.shippingService.makeShipping(this.shippingForm.value).subscribe({
      next: (data) =>
      {
        console.log("Sikeres mentés")
      }, error: (err) => {
        console.log("Sikertelen mentés: " + err.toString())
      }
    })
  }

  activateProduct(id: string) {
    const order = this.orders.find(order =>order._id === id)
    this.productService.changeState(order?.productId, 'ACTIVE').subscribe({
      next: (data) => {
        console.log("Sikeres módosítás")
      }, error: (err) => {
        console.log("Sikertelen módosítás: " + err)
      }
    })
  }

  navigate(to: string) {
    this.router.navigateByUrl(to)
  }

}
