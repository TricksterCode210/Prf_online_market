import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {ButtonModule} from 'primeng/button';
import {Router, RouterModule} from '@angular/router'
import {AuthService} from '../shared/services/auth.service'

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, FloatLabel, ButtonModule, RouterModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''
  password: string = '';

  constructor(private router: Router, private authService: AuthService)
  {
  }

  login() {
    if(this.username && this.password){
      this.authService.login(this.username, this.password).subscribe({
        next: (data) => {
          if(data){
            console.log(data)
            this.router.navigateByUrl('/home')
          }
        }, error:(err)=>  {
          console.log(err)
        }
      })
    } else {
      console.log("Nem jó")
    }
  }

  navigate(to: string){
    this.router.navigateByUrl(to);
  }
}
