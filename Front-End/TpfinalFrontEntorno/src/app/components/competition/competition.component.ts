import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';
import {MessageService} from "../../services/message/message.service";
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  complist :Array<Competition> = [];

  constructor(private comp: CompetitionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.GetAll();
  }


  GetAll(){
    this.comp.GetAll().subscribe((comp) =>{
      this.complist = comp;
      Active();
    });
  }

  Delete(id){
    Swal.fire({
      title: '¿Esta seguro desea eliminar el concurso?',
      text: 'Este concurso se va a eliminar para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comp.Delete(id).subscribe((data:any) =>{
          if(data.result === 'OK')
          Swal.fire(
            'Eliminado!',
            'El concurso fue eliminado con exito',
            'success'
          ).then((result) =>{
            this.GetAll();
          })
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El concurso fue cancelado',
          'error'
        )
      }
    })
  }
}
function Active(){
  $('.actionmenu').removeClass('active');
  $('.Competition  ').addClass('active');
}
