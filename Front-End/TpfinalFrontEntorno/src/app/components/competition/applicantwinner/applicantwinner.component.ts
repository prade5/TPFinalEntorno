import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant/applicant.service';
import {EvaluationService} from "../../../services/evaluation/evaluation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../services/message/message.service";
import {Router, ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import { CompetitionService } from 'src/app/services/competition/competition.service';

declare var $: any;

@Component({
  selector: 'app-aplicant',
  templateUrl: './applicantWinner.component.html',
  styleUrls: ['./applicantWinner.component.css']
})
export class AplicantWinnerComponent implements OnInit {
  aplicantlist: Array<any> = [];
  idComp:number;
  data: any;
  constructor(private applicant: ApplicantService,
              private evaluation: EvaluationService,
              private messageService: MessageService,
              private compService: CompetitionService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idComp = parseInt(this.route.snapshot.paramMap.get('id'));
    this.GetAllByComp(this.idComp);
    Active();
  }

  GetAllByComp(idComp){
    debugger;
    if(Number.isNaN(idComp))
      idComp = 0;
    this.applicant.GetAllByComp(idComp).subscribe( (applicants) => {
      this.aplicantlist = applicants;
      console.log(applicants)
    },
    (e: HttpErrorResponse)=>{ console.log(e) }
    );
  }

  DeclareWinner(idUserG, idCompetitionG){
    Swal.fire({
      title: '¿Esta seguro desea declarar el ganador del concurso?',
      text: 'Se declarara el ganador y cerrara el concurso',
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
        debugger;
        this.evaluation.PostWinner(this.data).subscribe((data2: any) => {
          debugger;
            if (data2.response.status === 200){
              Swal.fire(
                'Finalizado!',
                data2.response.message,
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
    debugger;
    if(aplicant.merit > 11){
      this.messageService.Error("Error", "El merito no se puede ser mayor que 10");
      return;
    }
    this.applicant.Put(aplicant).subscribe((data2: any) => {
        if (data2.response.status === 200){
          Swal.fire(
            'Actualizado',
            'El valor de merito del concursante fue actualizado',
            'success'
          ).then((result) =>{
            this.router.navigate(['/Competition']);
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
