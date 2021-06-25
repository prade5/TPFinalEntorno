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
    debugger;
    let role = this.task.GetRole().toLowerCase();
    if (this.task.loggedIn() && this.task.GetRole().toLowerCase() === ('admin').toLowerCase()) {
      this.GetAdmin();
    } else if (
      this.task.loggedIn() && this.task.GetRole().toLowerCase() === ('Jefe de catedra').toLowerCase()) {
      this.GetHeadoftheChair();
    } else if (this.task.loggedIn() && this.task.GetRole().toLowerCase() === ('postulante').toLowerCase()) {
      this.GetApplicant();
    } else {
      this.router.navigate(['/error']);
      return;
    }
    this.router.navigate(['/' + this.router.url]);
  }

  GetAdmin(){
    this.menunav=[
      {
        url:"/User",
        displayName:"Crear usuario",
        active:"active User"
      },
      // {
      //   url:"/Competition",
      //   displayName:"Crear concurso",
      //   active:"Competition"
      // },
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
    this.menunav=[
      {
        url:"/Applicant",
        displayName:"Postular al concurso",
        active:"active Applicant"
      },
      {
        url:"/calificate",
        displayName:"Mis Calificaciones",
        active:"Postulate"
      },
      {
        url:"/Postulate",
        displayName:"Mis Postulaciones",
        active:"Postulate"
      }
    ]
  }

  GetHeadoftheChair(){
    this.menunav=[
      {
        url:"/Course",
        displayName:"Mis Cursos",
        active:"active Course"
      },
      {
        url:"/Rating",
        displayName:"Calificaciones",
        active:"Rating"
      },
      {
        url:"/Competition",
        displayName:"Crear concurso",
        active:"Competition"
      }
    ]
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
