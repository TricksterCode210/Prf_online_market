import {Component, OnInit, signal} from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import {HomeComponent} from './home/home.component'
import {NavigatorComponent} from './navigator/navigator.component'
import {ButtonModule} from 'primeng/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    Menubar,
    ButtonModule,
    HomeComponent,
    NavigatorComponent
  ],
  template:`
    <app-navigator />
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-first-project test';
  items: MenuItem[] | undefined;

  ngOnInit()
  {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Eladás',
        icon: 'pi pi-money-bill'
      },
      {
        label: 'Vásárlás',
        icon: 'pi pi-shopping-cart'
      }
    ]
  }
}
