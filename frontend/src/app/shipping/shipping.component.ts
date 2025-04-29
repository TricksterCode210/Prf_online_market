import {Component, OnInit} from '@angular/core'
import {TableModule} from 'primeng/table'
import {TagModule} from 'primeng/tag'
import {Shipping} from '../shared/model/Shipping'
import {ShippingService} from '../shared/services/shipping.service'
import {Button} from 'primeng/button'
import {Image} from 'primeng/image'

@Component({
  selector: 'app-shipping',
  imports: [TableModule, TagModule, Button, Image],
  standalone: true,
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})
export class ShippingComponent implements OnInit {
  shippings!: Shipping[]

  constructor(private shippingService: ShippingService)
  {
  }

  ngOnInit() {
    this.shippingService.getAllShippingDetails().subscribe({
      next: (data) => {
        this.shippings = data
      }, error: (err) => {
        console.log("Hiba történt: " + err)
      }
    })
  }

}
