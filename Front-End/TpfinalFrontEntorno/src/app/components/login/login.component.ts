import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/auth/task.service';

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
    private taskService: TaskService,
    private router: Router, private fb:FormBuilder) {
    }

  ngOnInit(): void {
    this.initForm();
  }
  register() {
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
      this.taskService.Authentication(this.accountForm.value).subscribe(
        (success) => {
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
