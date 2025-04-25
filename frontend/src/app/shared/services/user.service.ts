import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:5000/getAllUsers', {withCredentials: true})
  }
}
