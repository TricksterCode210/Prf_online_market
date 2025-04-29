import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {Card} from 'primeng/card'
import {Button} from 'primeng/button'

@Component({
  selector: 'app-home',
  imports: [Card, Button],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router)
  {
  }

  navigate(to: string){
    this.router.navigateByUrl(to);
  }
}
