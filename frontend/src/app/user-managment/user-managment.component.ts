import { Component } from '@angular/core';
import {TableModule} from 'primeng/table'
import {TagModule} from 'primeng/tag'
import {User} from '../shared/model/User'
import {UserService} from '../shared/services/user.service'

@Component({
  selector: 'app-user-managment',
  imports: [TableModule, TagModule],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.scss',
  standalone: true
})
export class UserManagmentComponent {
  users!: User[];

  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) =>
      {
        this.users = data
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
