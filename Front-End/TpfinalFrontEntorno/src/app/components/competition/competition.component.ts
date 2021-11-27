import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';
import {MessageService} from "../../services/message/message.service";
import Swal from "sweetalert2";
import {TaskService} from "../../services/auth/task.service";

declare var $: any;

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  complist :Array<Competition> = [];
  curUserId : number;
  curUserRole: string;

  constructor(private comp: CompetitionService, private messageService: MessageService, private userFinder: TaskService,) {
    this.getIdUser();
  }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    let role = this.curUserRole  == 'admin' ? true : false;
      Active();
      this.comp.GetAll(role, this.curUserId).subscribe(result => {
        this.complist = JSON.parse(JSON.stringify(result));
      });
  }

  getIdUser(){
    this.curUserId =  this.userFinder.GetIdUser();
    this.curUserRole = this.userFinder.GetRole();
  }

  Delete(id){
    Swal.fire({
      title: '¿Está seguro desea eliminar el concurso?',
      text: 'Este concurso se va a eliminar para siempre',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comp.Delete(id).subscribe((data:any) =>{
          if(data.result === 'Ok')
          Swal.fire(
            'Eliminado!',
            'El concurso fue eliminado con éxito',
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
  $('.dropdown').removeClass('active');
  $('.Competition  ').addClass('active');
}
