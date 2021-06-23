import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';
import {SubjectService} from "../../services/subject/subject.service";
import {PositionService} from "../../services/position/position.service";
import {Subject} from "../../classes/subject";
import {Position} from "../../classes/position";
import {TaskService} from "../../services/auth/task.service";
import {Router} from "@angular/router";
import {ApplicantService} from "../../services/applicant/applicant.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Applicant} from "../../classes/applicant";
import {MessageService} from "../../services/message/message.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  complist :Array<Competition> = [];
  catedras: Subject[];
  posiciones: Position[];
  curUserId : number;
  curUserRole: string;


  constructor(private comp: CompetitionService, private subjectService: SubjectService,
              private positionService: PositionService,  private userFinder: TaskService,
              private applicantService: ApplicantService, private router: Router,
              private messageService: MessageService) {
    this.getMaterias();
    this.getPosiciones();
    this.GetAll();
    this.getUser();
  }

  ngOnInit(): void {
    this.fixData();
  }


  showMyData(): void {
    console.log(this.complist);
  }

  GetAll(){
    debugger;
    this.comp.GetAll().subscribe((comp) =>{
      this.complist = comp;
      debugger;
    });
  }


  getMaterias() {
    this.subjectService.GetAll().subscribe(result => {
      this.catedras = JSON.parse(JSON.stringify(result));
    });
  }

  getPosiciones() {
    this.positionService.GetAll().subscribe(result => {
      this.posiciones = JSON.parse(JSON.stringify(result));
    });
  }

  getUser(){
    if(this.userFinder.loggedIn()){
      this.curUserId = this.userFinder.GetIdUser();
      this.curUserRole = this.userFinder.GetRole();
    }

  }


  fixData() {
    this.complist.forEach(function (arrayItem) {
      var x = this.catedras.find(z => z.id === arrayItem.idSubject);
      var y = this.posiciones.find(k => k.id == arrayItem.idPosition);
      arrayItem.subjectName = x.name;
      arrayItem.positionName = y.name;
    });
  }

  inscribe(conId: number) {
    if(this.curUserRole === 'postulante') {
       if(this.curUserId != 0){
         var applicant = new Applicant();
         applicant.id = 0;
         applicant.idUser = this.curUserId;
         applicant.idCompetition = conId;
         applicant.applicantDate = new Date();
         applicant.state = 1;
         this.applicantService.Post(applicant).subscribe((data: any) => {
             if (data.response.status === 200){
               this.messageService.Success('Inscripto al concurso', data.response.message);
               setTimeout(()=>{
                 this.router.navigate(['/Competition']);
               }, 5000);
             }
             else{
               this.messageService.Error('Error', data.response.message);
             }
           },
           (err: HttpErrorResponse) => {
             console.log(err);
           });
       }
    }
    else {
      this.router.navigate(['Account']);
    }
  }


}
