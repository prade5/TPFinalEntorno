import { Component, OnInit } from '@angular/core';
import { JefecatedraService } from '../../../services/jefecatedra/jefecatedra.service';
import { JefedeCatedraMateria } from '../../../classes/jefedecatedra_materia';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-jefecatedra',
  templateUrl: './jefecatedra.component.html',
  styleUrls: ['./jefecatedra.component.css']
})
export class JefecatedraComponent implements OnInit {
  jcmlist :Array<JefedeCatedraMateria> = [];
  constructor(private jcatedraservice: JefecatedraService, private userService: UserService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    this.jcatedraservice.GetAll(0).subscribe((comp) =>{
      debugger;
      this.jcmlist = comp;
      Active();
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
        this.jcatedraservice.Delete(id).subscribe((data:any) =>{
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

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Competition').addClass('active');
}
