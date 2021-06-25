import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/classes/competition';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import {TaskService} from "../../services/auth/task.service";
import {Router} from "@angular/router";
import {ApplicantService} from "../../services/applicant/applicant.service";
import {Applicant} from "../../classes/applicant";
import {MessageService} from "../../services/message/message.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.css']
})
export class PostulationComponent implements OnInit {
  complist :Array<Competition> = [];
  constructor(private compservice: CompetitionService,private applicantService: ApplicantService, 
    private router: Router,  private taskservice: TaskService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.compservice.GetAllPostulation(this.taskservice.GetIdUser()).subscribe((comp) =>{
      debugger;
      this.complist = comp;
    });
  }

  inscribe(conId: number) {
    var applicant = new Applicant();
    applicant.id = 0;
    applicant.idUser = this.taskservice.GetIdUser();
    applicant.idCompetition = conId;
    applicant.applicantDate = new Date();
    applicant.state = 1;

    Swal.fire({
      title: '¿Inscribirse?',
      text: '¿Esta seguro de que desea inscribirse a este concurso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.applicantService.Post(applicant).subscribe((data: any) => {
            if (data.response.status === 200){
              Swal.fire(
                'Inscripto!',
                'Se Inscribio al concurso correctamente',
                'success'
              ).then((result) =>{
                this.router.navigate(['/OpenCompetion']);
              })
            }
            else{
              this.messageService.Error('Error', data.response.message);
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se a inscripto al concurso',
          'error'
        )
      }
    })
  }

}
