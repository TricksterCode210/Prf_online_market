import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {Menubar} from 'primeng/menubar'
import {NavbarComponent} from './navbar/navbar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, Menubar, NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Online Market';

  constructor(private router: Router) {
  }
}
