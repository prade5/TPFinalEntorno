import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/auth/task.service';

declare var  $: any;

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  accountForm: FormGroup;
  constructor(
    private taskService: TaskService,
    private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  private initForm():void{
    this.accountForm = this.fb.group({
      userName: this.taskService.GetUserName(),
      userPass: ['',[Validators.required]],
      newUserPass: ['',[Validators.required]],
      confirmPass: ['',[Validators.required]]
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
      this.taskService.Put(this.accountForm.value).subscribe(
        (success) => {
          if (success) {
              this.router.navigate(['/MenuAdmin']);
            }else {
              this.router.navigate(['/Error']);
            }
        },
        (err: any) => {
          $('.errmessage').html(err.response.message);
        }
      );
    }
  }

}
