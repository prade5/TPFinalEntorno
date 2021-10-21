import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menunav:any;
  constructor() { }

  GetMenu(role){
    return  this.GetTypeUser(role);
  }
  private GetTypeUser(role){

    if (role === ('admin').toLowerCase()) {
      return this.GetAdmin();
    } else if (role === ('Jefe de catedra').toLowerCase()) {
      return this.GetHeadoftheChair();
    } else if (role === ('postulante').toLowerCase()) {
      return this.GetApplicant();
    } else {     
      return  'error';
    }     
  }
  private  GetAdmin(){
    this.menunav=[
      {
        url:"/User",
        displayName:"Crear usuario",
        active:"active User"
      },
      {
        url:"/Applicant",
        displayName:"Declarar resultado",
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
      },
      {
        url:"/Competition",
        displayName:"Crear concurso",
        active:"Competition"
      }
    ]
    return this.menunav;
  }

  private GetApplicant(){
    this.menunav=[
      {
        url:"/OpenCompetion",
        displayName:"Concursos abiertos",
        active:"active Applicant"
      }
      // {
      //   url:"/calificate",
      //   displayName:"Mis Calificaciones",
      //   active:"calificate"
      // },
      // {
      //   url:"/Postulate",
      //   displayName:"Mis Postulaciones",
      //   active:"Postulate"
      // }
      // ,
      // {
      //   url:"/Home",
      //   displayName:"Concursos abiertos",
      //   active:"Concursos"
      // }
    ]
    return this.menunav;
  }

  private GetHeadoftheChair(){
    this.menunav=[
      {
        url:"/Course",
        displayName:"Mis Cursos",
        active:"active Course"
      },
      // {
      //   url:"/Rating",
      //   displayName:"Calificaciones",
      //   active:"Rating"
      // },
      {
        url:"/Competition",
        displayName:"Crear concurso",
        active:"Competition"
      }
    ]
    return this.menunav;
  } 
}
