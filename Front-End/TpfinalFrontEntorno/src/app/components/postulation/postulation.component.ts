import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/classes/competition';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import {TaskService} from "../../services/auth/task.service";
import {Router} from "@angular/router";
import {ApplicantService} from "../../services/applicant/applicant.service";
import {Applicant} from "../../classes/applicant";
import {MessageService} from "../../services/message/message.service";
import { UserService } from '../../services/user/user.service';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.css']
})
export class PostulationComponent implements OnInit {
  complist :Array<Competition> = [];
  constructor(private compservice: CompetitionService,private applicantService: ApplicantService, 
    private router: Router,  private taskservice: TaskService, private userservice: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    debugger; 
    if(this.taskservice.GetIspostulateOut() != null){
      this.inscribe(this.taskservice.GetIspostulateOut());
    }
    else{
      this.GetAll();
    }
  }

  GetAll(){
    this.compservice.GetAllPostulation(this.taskservice.GetIdUser()).subscribe((comp) =>{
      debugger;
      this.complist = comp;
    });
  }

  inscribe(conId: number){     
    $('.idUser').val(this.taskservice.GetIdUser());
    $('.idCompetition').val(conId);
    $('#exampleModal').modal("show");
  }
  Subscribe(){
    let postulate ={
      id:0,
      idUser:$('.idUser').val(),
      idCompetition:$('.idCompetition').val(),
      applicantDate:new Date(),
      state:1
    };
    debugger;
    this.applicantService.Post(postulate).subscribe((data: any) => {
      debugger;
      if (data.response.status === 200){
        if(this.taskservice.GetIspostulateOut() != null){
          this.taskservice.RemoveIspostulateOut();
        };
        this.GetAll();
        $('#exampleModal').modal("hide");
      }
      else{
        this.SetClose(data.response.message);
      }
    },
    (err: HttpErrorResponse) => {  
      debugger;
      this.SetClose(err.error.message);
    });
  }

  SetClose(message){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })   
    this.taskservice.RemoveIspostulateOut();
    $('#exampleModal').modal("hide");
    this.SetRedirect();
  }
  SetRedirect(){
    setTimeout(()=>{
      if(this.taskservice.GetRole().toLowerCase() === ('admin').toLowerCase()){
        this.router.navigate(['/MenuAdmin']);
      }
      else if(this.taskservice.GetRole().toLowerCase() === ('Jefe de catedra').toLowerCase()){
        this.router.navigate(['/MenuAdmin']);
      }
    }, 5000);   
  }
  Close(){
    if(this.taskservice.GetRole().toLowerCase() !== ('postulante').toLowerCase()){
      this.taskservice.RemoveIspostulateOut();
      this.router.navigate(['/MenuAdmin']);
    }
  }
}
