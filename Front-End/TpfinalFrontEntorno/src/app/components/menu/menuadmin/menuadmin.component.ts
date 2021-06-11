import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { TaskService } from 'src/app/services/auth/task.service';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {
  menunav:any;
  linkprincipal:any;
  constructor(private task: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.linkprincipal ="/Principal";
    this. GetTypeUser();
  }
  GetTypeUser(){
    let decodotken = decode(this.task.getJwtToken());
    let role = decodotken['role'];
     if (this.task.loggedIn() && role === 'admin'.toLowerCase()) {
       this.GetAdmin();
     } else if (
       this.task.loggedIn() && role === 'jefe carrera'.toLowerCase()) {
       this.GetHeadoftheChair();
     } else if (this.task.loggedIn() && role === 'postulante'.toLowerCase()) {
       this.GetApplicant();
     } else {
       this.router.navigate(['/error']);
     }
  }

  GetAdmin(){
    this.menunav=[
      {
        url:"#",
        displayName:"Crear usuario",
        active:"active"
      },
      {
        url:"#r",
        displayName:"Crear concurso",
        active:""
      },
      {
        url:"#",
        displayName:"Postulante",
        active:""
      },
      {
        url:"#",
        displayName:"Jefe de catedra",
        active:""
      }
    ]
  }

  GetApplicant(){

  }

  GetHeadoftheChair(){

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
