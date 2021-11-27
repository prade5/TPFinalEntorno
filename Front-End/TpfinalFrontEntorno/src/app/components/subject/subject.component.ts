import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { Subject } from '../../classes/subject';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjectlist :Array<Subject> = [];

  constructor(private subservice: SubjectService) { }

  ngOnInit(): void {
   this.GetAll();
  }

  GetAll(): void{
    this.subservice.GetAll().subscribe( (sub) =>{
      this.subjectlist = sub;
      Active();
    });
  }

  Delete(id){
    Swal.fire({
      title: '¿Está seguro desea eliminarlo?',
      text: 'La materia será eliminada para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        this.subservice.Delete(id).subscribe((data:any) =>{
          if(data.result === 'OK')
          debugger;
          Swal.fire(
            'Eliminado!',
            'La materia fue eliminada con éxito',
            'success'
          ).then((result) =>{
              this.GetAll();
          })
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El borrado fue cancelado',
          'error'
        )
      }
    })
  }
}
function Active(){
  $('.actionmenu').removeClass('active');
  $('.Subject').addClass('active');
}
