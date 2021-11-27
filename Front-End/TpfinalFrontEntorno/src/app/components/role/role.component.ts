import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../classes/role';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  rolelist :Array<Role> = [];
  position: string;
  constructor(private roleService: RoleService) {
             }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    debugger;
    this.roleService.GetAll().subscribe((role) =>{
      this.rolelist = role;
    });
  }

  Delete(id){
    Swal.fire({
      title: '¿Está seguro desea eliminarlo?',
      text: 'Este archivo se va a eliminar para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.roleService.Delete(id).subscribe((data:any) =>{
          if(data.result === 'OK')
          debugger;
          Swal.fire(
            'Eliminado!',
            'El archivo fue eliminado con éxito',
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
