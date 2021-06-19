import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../services/message/message.service";
import Swal from "sweetalert2";
import {TaskService} from "../../services/auth/task.service";

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
    if( this.curUserRole === 'admin' ) {
      this.comp.GetAll().subscribe(result => {
        this.complist = JSON.parse(JSON.stringify(result));
      });
    }
    else if (this.curUserRole === 'Jefe de Catedra') {
      this.comp.GetByUserId(this.curUserId).subscribe(result => {
        this.complist = JSON.parse(JSON.stringify(result));
      });
    }
  }

  getIdUser(){
    this.curUserId =  this.userFinder.GetIdUser();
    this.curUserRole = this.userFinder.GetRole();
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
        debugger;
        this.comp.Delete(id).subscribe((data:any) =>{
          if(data.result === 'OK')
            debugger;
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
