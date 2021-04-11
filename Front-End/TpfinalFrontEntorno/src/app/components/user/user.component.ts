import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {User} from '../../classes/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist :Array<User> = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.GetAll().subscribe( (user) =>{
      this.userlist = user;
    });
  }

}
