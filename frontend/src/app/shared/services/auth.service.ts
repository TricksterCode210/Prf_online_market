import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {User} from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User){
    const bodyRegister = new URLSearchParams();
    bodyRegister.set('name', user.name)
    bodyRegister.set('username', user.username)
    bodyRegister.set('address', user.address)
    bodyRegister.set('email', user.email)
    bodyRegister.set('password', user.password)
    bodyRegister.set('userRole', user.userRole)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/register', bodyRegister, {headers: headers})
  }

  login(username: string, password: string){
    const bodyLogin = new URLSearchParams();
    bodyLogin.set('username', username)
    bodyLogin.set('password', password)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    return this.http.post('http://localhost:5000/login', bodyLogin, {headers: headers, withCredentials: true})
  }

  logout(){
    return this.http.post('http://localhost:5000/logout', {}, {withCredentials: true, responseType: 'text'})
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/checkAuth', {withCredentials: true})
  }

  loggedInUser() {
    return this.http.get<User>('http://localhost:5000/loggedInUser', {withCredentials: true})
  }
}
