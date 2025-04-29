import {Injectable, signal} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {User} from '../model/User'
import {tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = signal(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

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

    return this.http.post('http://localhost:5000/login', bodyLogin, {headers: headers, withCredentials: true}).pipe(
      tap(() => {
        this._isAuthenticated.set(true);
      })
    );
  }

  logout(){
    return this.http.post('http://localhost:5000/logout', {}, {withCredentials: true, responseType: 'text'}).pipe(
      tap(() => {
        this._isAuthenticated.set(false);
      })
    );
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/checkAuth', {withCredentials: true}).pipe(
      tap((auth) => {
        this._isAuthenticated.set(auth);
      })
    );
  }

  loggedInUser() {
    return this.http.get<User>('http://localhost:5000/loggedInUser', {withCredentials: true})
  }
}
