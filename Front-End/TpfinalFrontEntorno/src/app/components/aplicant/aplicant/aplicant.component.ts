import { Component, OnInit } from '@angular/core';
import { Applicant } from 'src/app/classes/applicant';
import { ApplicantService } from 'src/app/services/applicant/applicant.service';
import {EvaluationService} from "../../../services/evaluation/evaluation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../services/message/message.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: 'app-aplicant',
  templateUrl: './aplicant.component.html',
  styleUrls: ['./aplicant.component.css']
})
export class AplicantComponent implements OnInit {
  data: any;
  aplicantlist: Array<Applicant> = [];

  constructor(private applicant: ApplicantService,
              private evaluation: EvaluationService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.applicant.GetAll().subscribe((applicant) =>{
      debugger;
      this.aplicantlist = applicant;
      Active();
    });
  }

  DeclareWinner(idUserG, idCompetitionG){
    Swal.fire({
      title: '¿Está seguro que desea declarar el ganador del concurso?',
      text: 'Se declarará el ganador y cerrará el concurso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data = {
          idUser: idUserG,
          idCompetition: idCompetitionG
        }
        this.evaluation.PostWinner(this.data).subscribe((data2: any) => {
            if (data2.response.status === 200){
              Swal.fire(
                'Finalizado!',
                'El ganador del concurso fue declarado',
                'success'
              ).then((result) =>{
                this.router.navigate(['/Competition']);
              })
            }
          },
          (err: HttpErrorResponse) => {
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El ganador no fue declarado',
          'error'
        )
      }
    })
  }

  CambiarMerito(aplicant){
    this.applicant.Put(aplicant).subscribe((data2: any) => {
        if (data2.response.status === 200){
          Swal.fire(
            'Actualizado',
            'El valor de mérito del concursante fue actualizado',
            'success'
          ).then((result) =>{
          })
        }
      },
      (err: HttpErrorResponse) => {
      });
  }
}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Applicant ').addClass('active');
}
