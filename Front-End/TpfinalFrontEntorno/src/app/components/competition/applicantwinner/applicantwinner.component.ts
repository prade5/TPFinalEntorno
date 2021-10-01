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
export class AplicantComponent implements OnInit {
  aplicantlist: Array<any> = [];
  idComp:number;

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
    this.applicant.GetAllByComp(idComp).subscribe( (applicants) => {
      this.aplicantlist = applicants;
      console.log(applicants)
    },
    (e: HttpErrorResponse)=>{ console.log(e) } 
    );
  }

  DeclareWinner(idComp, idUser){
    debugger;
    this.compService.DeclareWinner(idComp, idUser).subscribe(() => {
      debugger;
        Swal.fire(
          'Actualizado',
          'El Ganador del concurso fué declarado con éxito',
          'success'
        ).then((result) =>{
          this.router.navigate(['/Competition']);
        })
    },
    (err: HttpErrorResponse) => {
    });
    debugger;
  }

}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Applicant ').addClass('active');
}