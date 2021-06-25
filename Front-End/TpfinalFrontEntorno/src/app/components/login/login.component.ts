import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/auth/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadscriptService } from 'src/app/services/loadScript/loadscript.service';
import { UserService } from '../../services/user/user.service';
import {ApplicantService} from "../../services/applicant/applicant.service";
import {Applicant} from "../../classes/applicant";
import {MessageService} from "../../services/message/message.service";
import Swal from "sweetalert2";

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
    private taskService: TaskService, private loadscript: LoadscriptService,private applicantService: ApplicantService,
    private router: Router, private fb:FormBuilder, private userservice: UserService,private taskservice: TaskService,
    private messageService: MessageService) {
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
      this.taskService.Authentication(this.accountForm.value).subscribe(
        (success) => {
          // if(this.taskService.GetIspostulateOut() != null && success){
          //   this.userservice.ValidateRolePostulation(this.taskService.GetIdUser()).subscribe((isvalid) =>{
          //     if(isvalid){
          //       this.inscribe(this.taskService.GetIdUser());
          //     }
          //   });
          // }
          // else 
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
  
  inscribe(conId: number) {
    var applicant = new Applicant();
    applicant.id = 0;
    applicant.idUser = this.taskservice.GetIdUser();
    applicant.idCompetition = conId;
    applicant.applicantDate = new Date();
    applicant.state = 1;

    Swal.fire({
      title: '¿Inscribirse?',
      text: '¿Esta seguro de que desea inscribirse a este concurso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.applicantService.Post(applicant).subscribe((data: any) => {
            if (data.response.status === 200){
              Swal.fire(
                'Inscripto!',
                'Se Inscribio al concurso correctamente',
                'success'
              ).then((result) =>{
                this.router.navigate(['/OpenCompetion']);
              })
            }
            else{
              this.messageService.Error('Error', data.response.message);
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se a inscripto al concurso',
          'error'
        )
      }
    })
  }
}
