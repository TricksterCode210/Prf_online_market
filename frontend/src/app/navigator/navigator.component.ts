import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import {RouterLink} from '@angular/router'
import {ButtonModule} from 'primeng/button'

@Component({
	selector: 'app-navigator',
	imports: [
    Menubar,
    ButtonModule,
    RouterLink
  ],
	templateUrl: './navigator.component.html',
	standalone: true,
	styleUrl: './navigator.component.scss'
})
export class NavigatorComponent {
  items: MenuItem[] | undefined;
  buttonInfo: string = 'info';

  ngOnInit()
  {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        link: ''
      },
      {
        label: 'Eladás',
        icon: 'pi pi-money-bill',
        link: '/sell'
      },
      {
        label: 'Vásárlás',
        icon: 'pi pi-shopping-cart',
        link: '/buy'
      }
    ]
  }
}
