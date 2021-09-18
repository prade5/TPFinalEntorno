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
import Swal from "sweetalert2";
import { Constant } from 'src/app/classes/constant';
import { LoadscriptService } from 'src/app/services/loadScript/loadscript.service';


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

  constructor(private comp: CompetitionService, private router: Router, 
    private loadscript: LoadscriptService) {
  }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.comp.GetAll().subscribe((comp) =>{
      this.complist = comp;
    });
  }

  inscribe(conId) {  
    debugger;  
    localStorage.setItem(Constant.IspostulateOut, this.loadscript.Encrypt(conId));
    this.router.navigate(['Account']);
  }
}
