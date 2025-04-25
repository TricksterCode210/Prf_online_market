import {Component, OnInit} from '@angular/core'
import {Menubar} from 'primeng/menubar'
import {MenuItem} from 'primeng/api'
import {Router, RouterLink} from '@angular/router'
import {Button} from 'primeng/button'
import {AuthService} from '../shared/services/auth.service'
import {NgIf} from '@angular/common'
import {authGuard} from '../shared/guards/auth.guard'

@Component({
  selector: 'app-navbar',
  imports: [Menubar, RouterLink, Button, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true
})
export class NavbarComponent implements OnInit {
  pages: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router)
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
