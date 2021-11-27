import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';
import {Subject} from "../../classes/subject";
import {Position} from "../../classes/position";
import {TaskService} from "../../services/auth/task.service";
import {Router} from "@angular/router";
import { Constant } from 'src/app/classes/constant';
import { LoadscriptService } from 'src/app/services/loadScript/loadscript.service';
import { AuthService } from '../../services/auth/auth.service';


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
    private loadscript: LoadscriptService, private userFinder: TaskService, private auth:AuthService) {
  }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    let isconected = this.auth.isAuthenticated();
    this.curUserId = isconected === true ? this.userFinder.GetIdUser(): 0;
    let role = isconected === true ? (this.curUserRole  == 'admin' ? true : false): true;

    this.comp.GetAll(role, this.curUserId).subscribe((comp) =>{
      this.complist = comp;
    });
  }

  inscribe(conId) {
    localStorage.setItem(Constant.IspostulateOut, this.loadscript.Encrypt(conId));
    this.router.navigate(['Account']);
  }
}
