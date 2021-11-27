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
      title: '¿Está seguro desea eliminarlo?',
      text: 'El jefe de cátedra será eliminado para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.jcatedraservice.Delete(id).subscribe((data:any) =>{
            Swal.fire(
              'Eliminado!',
              'El jefe de cátedra fue eliminado con éxito',
              'success'
            ).then((data) =>{
              this.GetAll();
            })
          },
          (err) => (console.log(err)));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El jefe de cátedra no fue eliminado',
          'error'
        )
      }
    })
  }
}


function Active(){
  $('.actionmenu').removeClass('active');
  $('.Jefedecatedra').addClass('active');
}
