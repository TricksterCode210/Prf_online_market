import { Component } from '@angular/core';
import {Product} from '../shared/model/Product'
import {ProductService} from '../shared/services/product.service'
import {Router} from '@angular/router'
import {NgIf} from '@angular/common'
import {Button} from 'primeng/button'

@Component({
  selector: 'app-details',
  imports: [
    NgIf,
    Button
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true
})
export class DetailsComponent {

  product!: Product;

  constructor(private productService: ProductService, private router: Router)
  {
  }

  ngOnInit() {
    const productId = this.router.url.split('/')[2]
    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.product = data
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  buyingProduct() {
    this.productService.buyingProduct(this.product._id).subscribe({
      next: (data) => {
        console.log("Sikeres vásárlás")
        this.navigate("/buy")
      }, error: (err) => {
        console.log("Sikertelen vásárlás: " + err)
      }
    })
  }

  navigate(to: string) {
    this.router.navigateByUrl(to)
  }

}
