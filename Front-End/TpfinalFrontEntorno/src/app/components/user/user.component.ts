import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {User} from '../../classes/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist :Array<User> = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll():void{
    this.userService.GetAll().subscribe( (user) =>{
      debugger;
      this.userlist = user;
    });
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
          if(data.result === 'OK')
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
}
