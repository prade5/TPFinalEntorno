import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  constructor() { }

  ngOnInit(): void {
  }
  register() {
    console.log(this.email);
    console.log(this.password);
  }
}
