import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { TaskService } from 'src/app/services/auth/task.service';
import { LoadscriptService } from 'src/app/services/loadScript/loadscript.service';

const urljs = '../../../../assets/js/menu.js';
declare var $: any;

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {
  menunav:any;
  perfil:any;
  linkprincipal:any;
  constructor(private task: TaskService,
    private router: Router, private loadscript: LoadscriptService) { }

  ngOnInit(): void {
    debugger;
    this.linkprincipal ="/MenuAdmin";
    this.perfil ="/User/perfil/"+ this.task.GetIdUser();
    this. GetTypeUser();
    this.loadscript.loadScript(urljs);
  }
  GetTypeUser(){
    // debugger;
    if (this.task.loggedIn() && this.task.GetRole().toLowerCase() === ('admin').toLowerCase()) {
      this.GetAdmin();
    } else if (
      this.task.loggedIn() && this.task.GetRole().toLowerCase() === ('jefe carrera').toLowerCase()) {
      this.GetHeadoftheChair();
    } else if (this.task.loggedIn() && this.task.GetRole().toLowerCase() === ('postulante').toLowerCase()) {
      this.GetApplicant();
    } else {
      this.router.navigate(['/error']);
      return;
    }
    // let ishave = $('.dropdown').hasClass();
    debugger;
    let url = this.router.url;
    this.router.navigate(['/Welcome']);
  }

  GetAdmin(){
    this.menunav=[
      {
        url:"/User",
        displayName:"Crear usuario",
        active:"active User"
      },
      {
        url:"/Competition",
        displayName:"Crear concurso",
        active:"Competition"
      },
      {
        url:"/Applicant",
        displayName:"Postulante",
        active:"Applicant"
      },
      {
        url:"/jefedecatedra_materia",
        displayName:"Asignar jefe de catedra",
        active:"Jefedecatedra"
      },
      {
        url:"/Subject",
        displayName:"Crear materia",
        active:"Subject"
      }
    ]
  }

  GetApplicant(){
    debugger;
    let url = this.router.url;
    this.menunav=[
      {
        url:"/Home",
        displayName:"Concursos abiertos",
        active:"Concursos"
      }
    ]
    this.router.navigate(['/Welcome']);
  }

  GetHeadoftheChair(){
    debugger;
    let url = this.router.url;
    this.menunav=[
      {
        url:"/Competition",
        displayName:"Crear concurso",
        active:"Competition"
      },
      {
        url:"/Applicant",
        displayName:"Postulante",
        active:"Applicant"
      }
    ]
    this.router.navigate(['/Welcome']);
  }

  Logout(islogout = false){
    debugger;
    if(islogout){
      let val = this.task.Logout();
      if(val){
        this.router.navigate(['/Account']);
      }
    }
  }
}
