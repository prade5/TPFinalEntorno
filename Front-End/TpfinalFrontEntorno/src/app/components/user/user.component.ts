import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {User} from '../../classes/user';
import Swal from 'sweetalert2';
import { Role } from 'src/app/classes/role';
import { RoleService } from 'src/app/services/role/role.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist :Array<User> = [];
  rolelist :Array<Role> = [];
  user:any;
  browserForm: FormGroup;

  constructor(private userService: UserService,private roleService: RoleService, private fb:FormBuilder,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.GetAll();
    this.GetAllRole();
    this.initForm();
  }

  GetAll():void{
    this.userService.GetAll().subscribe( (user) =>{
      debugger;
      this.userlist = user;
    });
  }

  ChangeRole(id){
    this.userService.GetById(id).subscribe( (user) =>{
    this.user = user;
    this.browserForm.patchValue(user);
      $('#exampleModal').modal('show');
    });
  }

  private initForm():void{
    this.browserForm = this.fb.group({
      id:0,
      idRole: ['',[Validators.required]],
      state:1
    });
  }

  GetAllRole(){
    this.roleService.GetAll().subscribe((role) =>{
      this.rolelist = role;
    });
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  Delete(id){
    Swal.fire({
      title: '¿Esta seguro desea eliminarlo?',
      text: 'Este archivo se va a eliminar para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.userService.Delete(id).subscribe((data:any) =>{
          if(data.response.status === 200)
          debugger;
          Swal.fire(
            'Eliminado!',
            'El archivo fue eliminado con exito',
            'success'
          ).then((result) =>{
              this.GetAll();
          })
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El archivo fue cancelado',
          'error'
        )
      }
    })
  }
  Create (){
    if(this.browserForm.valid) {
      this.ActionCreate();
    }
  }

  ActionCreate(){
    this.userService.ChangeRole(this.browserForm.value).subscribe((data:any) =>{
      debugger;
      if(data.status === 200){
        this.GetAll();
        $('#exampleModal').modal('hide');
        this.messageService.Success('Crear Usuario', data.message);
      }
      else{
        this.messageService.Error('Error', data.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }
}
