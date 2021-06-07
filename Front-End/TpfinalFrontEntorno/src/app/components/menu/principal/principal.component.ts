import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/auth/task.service';
import decode from 'jwt-decode';
import { UserService } from '../../../services/user/user.service';
import {User} from '../../../classes/user';

declare var $: any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  menunav:any;
  linkprincipal:any;
  userlist :Array<User> = [];
  constructor(
    private task: TaskService,
    private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this. GetTypeUser();
    this.GetAllUser();
    this.linkprincipal ="/User";
  }
  GetAllUser(){
    this.userService.GetAll().subscribe( (user) =>{
      debugger;
      this.userlist = user;
    });
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