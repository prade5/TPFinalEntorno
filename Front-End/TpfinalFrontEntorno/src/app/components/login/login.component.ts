import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/auth/task.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var  $: any;

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
  isLogin:string= 'none!important';
  constructor(
    private userService: TaskService,
    private router: Router, private fb:FormBuilder) {
    }

  ngOnInit(): void {
    // $('app-navbar').hide().css("visibility", "hidden");
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
              this.router.navigate(['/MenuAdmin']);
            }else {
              this.router.navigate(['/Error']);
            }
        },
        (err: any) => {
          debugger;
          $('.errmessage').html(err.response.message);
        }
      );
    }
  }
}
