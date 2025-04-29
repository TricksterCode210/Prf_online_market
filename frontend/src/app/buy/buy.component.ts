import {Component, OnInit} from '@angular/core'
import {Product} from '../shared/model/Product'
import {ProductService} from '../shared/services/product.service'
import {Card} from 'primeng/card'
import {Button} from 'primeng/button'
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router'

@Component({
  selector: 'app-buy',
  imports: [
    Card,
    Button,
    NgForOf
  ],
  standalone: true,
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit{
  products!: Product[];

  constructor(private productService: ProductService, private router: Router)
  {
  }

  ngOnInit() {
    this.productService.getAllActiveProducts().subscribe({
      next: (data) => {
        this.products = data
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  navigate(to: string){
    this.router.navigateByUrl(to);
  }
}
