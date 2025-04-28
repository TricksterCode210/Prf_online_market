import {Component, OnInit} from '@angular/core'
import {Menubar} from 'primeng/menubar'
import {MenuItem} from 'primeng/api'
import {Router, RouterLink} from '@angular/router'
import {Button} from 'primeng/button'
import {AuthService} from '../shared/services/auth.service'
import {AsyncPipe, NgIf} from '@angular/common'

@Component({
  selector: 'app-navbar',
  imports: [Menubar, RouterLink, Button, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true
})
export class NavbarComponent implements OnInit {
  pages: MenuItem[] | undefined;
  isAuth!: boolean;

  constructor(protected authService: AuthService, private router: Router)
  {
  }

  ngOnInit() {
    this.pages = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        link: "/home"
      },
      {
        label: "Eladás",
        icon: 'pi pi-money-bill',
        link: "/sell"
      },
      {
        label: "Vásárlás",
        icon: "pi pi-shopping-cart",
        link: "/buy"
      },
      {
        label: "Felhasználók",
        icon: "pi pi-user",
        link: "/users"
      }
    ]

    this.authService.checkAuth().subscribe({
      next: (result) => {
        this.isAuth = result
      },
      error: (err) => {
        this.isAuth = false
        console.log(err)
      }
    })
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigateByUrl('/home')
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
