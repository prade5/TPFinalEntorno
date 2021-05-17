import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/auth/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  accountForm: FormGroup;
  constructor(
    private userService: TaskService,
    private router: Router, private fb:FormBuilder) {
    }

  ngOnInit(): void {
    this.initForm();
  }
  register() {
    console.log(this.email);
    console.log(this.password);
  }
  private initForm():void{
    this.accountForm = this.fb.group({
      userName: ['',[Validators.required]],
      userPass: ['',[Validators.required]]
    });
  }

  isValidField(field: string): string{
    const validatedField = this.accountForm.get(field);
    return(!validatedField.valid && validatedField.touched) ?
      'is-invalid': validatedField.touched ? 'is-valid':'';
  }

  OnSubmit() {
    debugger;
    if(this.accountForm.valid) {
      this.userService.Authentication(this.accountForm.value).subscribe(
        (success) => {
          debugger;
          if (success) {
          let decodotken = decode(this.userService.getJwtToken());
           let role = decodotken['role'];
            if (this.userService.loggedIn() && role === 'admin'.toLowerCase()) {
              this.router.navigate(['/Principal']);
            } else if (
              this.userService.loggedIn() && role === 'jefe carrera'.toLowerCase()) {
              this.router.navigate(['/jefecarrera']);
            } else if (this.userService.loggedIn() && role === 'postulante'.toLowerCase()) {
              this.router.navigate(['/postulante']);
            } else {
              this.router.navigate(['/error']);
            }
          }
        },
        (err: HttpErrorResponse) => {
          debugger;
        }
      );
    }
  }
}
