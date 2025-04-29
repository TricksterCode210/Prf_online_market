import {Component, computed, effect, OnInit, Signal, signal} from '@angular/core'
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
  isAuth!: Signal<boolean>;

  pages = computed<MenuItem[]>(() => {
    const auth = this.isAuth();

    const items: MenuItem[] = [
      { label: 'Home', icon: 'pi pi-home', link: '/home' },
      { label: 'Vásárlás', icon: 'pi pi-shopping-cart', link: '/buy' },
    ];

    if (auth) {
      items.push(
        { label: 'Eladás', icon: 'pi pi-money-bill', link: '/sell' },
        { label: 'Felhasználók', icon: 'pi pi-user', link: '/users' },
        { label: 'Megrendelések', icon: 'pi pi-shop', link: '/orders' },
        { label: 'Kiszállítás', icon: 'pi pi-truck', link: '/shipping' }
      );
    }

    return items;
  });

  constructor(protected authService: AuthService, private router: Router)
  {
  }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl('/home')
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
