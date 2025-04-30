import {Component, OnInit, signal} from '@angular/core'
import {Product} from '../shared/model/Product'
import {ProductService} from '../shared/services/product.service'
import {Card} from 'primeng/card'
import {Button} from 'primeng/button'
import {NgForOf, NgIf} from '@angular/common'
import {Router} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {Image} from 'primeng/image'
import {User} from '../shared/model/User'
import {AuthService} from '../shared/services/auth.service'

@Component({
  selector: 'app-buy',
  imports: [
    Card,
    Button,
    NgForOf,
    NgIf,
    FormsModule,
    Image
  ],
  standalone: true,
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent implements OnInit{
  products= signal<Product[]>([]);
  user= signal<User>({address: '', email: '', name: '', password: '', userRole: '', username: ''})

  constructor(private productService: ProductService, private router: Router, private authService: AuthService)
  {
  }

  ngOnInit() {
    this.productService.getAllActiveProducts().subscribe({
      next: (data) => {
        this.products.set(data)
      }, error: (err) => {
        console.log(err)
      }
    })

    this.authService.loggedInUser().subscribe({
      next: (data) => {
        this.user.set(data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  navigate(to: string){
    this.router.navigateByUrl(to);
  }
}
