import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { SubmitButtonComponent} from './submit-button/submit-button.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    Menubar,
    SubmitButtonComponent
  ],
  templateUrl: './app.component.html',
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
