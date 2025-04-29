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
    private shippingService: ShippingService
    ){}

  ngOnInit()
  {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    const sevenDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() +7);
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
    console.log('Törlés: ' + id)
  }

  shipOrder(id:string)
  {
    const order = this.orders.find(order =>order._id === id)
    this.shippingForm.patchValue({
      from: order?.shippingAddress,
      buyer: order?.buyerName,
      productName: order?.productName
    });
    this.orderService.shipOrder(id).subscribe({
      next: (data) => {
        this.makeShipping()
        console.log("Sikeres vásárlás")
      }, error: (err) => {
        console.log("Sikertelen vásárlás: " + err)
      }
    })
  }

  makeShipping() {
    this.shippingService.makeShipping(this.shippingForm.value).subscribe({
      next: (data) =>
      {
        console.log("Sikeres mentés")
        this.navigate("/shipping")
      }, error: (err) => {
        console.log("Sikertelen mentés: " + err.toString())
      }
    })
  }

  navigate(to: string) {
    this.router.navigateByUrl(to)
  }

}
