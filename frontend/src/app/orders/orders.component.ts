import {Component, OnInit} from '@angular/core'
import {Order} from '../shared/model/Order'
import {OrderService} from '../shared/services/order.service'
import {TableModule} from 'primeng/table'
import {TagModule} from 'primeng/tag'
import {Image} from 'primeng/image'
import {Button} from 'primeng/button'

@Component({
  selector: 'app-orders',
  imports: [TableModule, TagModule, Image, Button],
  standalone:true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders!: Order[]

  constructor(private orderService: OrderService){}

  ngOnInit()
  {
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
    console.log('Szállítás: ' + id)
  }

}
