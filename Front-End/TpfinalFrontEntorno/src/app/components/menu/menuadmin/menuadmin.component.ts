import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/auth/task.service';
import { LoadscriptService } from 'src/app/services/loadScript/loadscript.service';
import { MenuService} from '../../../services/menu/menu.service';

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
  constructor(private task: TaskService, private menuservice: MenuService,
    private router: Router, private loadscript: LoadscriptService) { }

  ngOnInit(): void {
    debugger;
    this.linkprincipal ="/MenuAdmin";
    this.perfil ="/User/perfil/"+ this.task.GetIdUser();
    this. GetTypeUser();
    this.loadscript.loadScript(urljs);
  }
  GetTypeUser(){
    if (this.task.loggedIn()) {
       this.menunav =  this.menuservice.GetMenu(this.task.GetRole().toLowerCase());
    } 
    else {
      this.router.navigate(['/error']);
      return;
    } 

    if(this.task.GetIspostulateOut() != null){
      this.router.navigate(['/OpenCompetion']);
    }
    else if(this.router.url ==="/MenuAdmin" && this.task.GetRole().toLowerCase() === ('admin').toLowerCase()){
      this.router.navigate(['/User']);
    }
    else if(this.router.url ==="/MenuAdmin" && this.task.GetRole().toLowerCase() === ('Jefe de catedra').toLowerCase()){
      this.router.navigate(['/Course']);
    }
    else if(this.router.url ==="/MenuAdmin" && this.task.GetRole().toLowerCase() === ('postulante').toLowerCase()){
      this.router.navigate(['/OpenCompetion']);
    }
    else {
      this.router.navigate(['/' + this.router.url]);
    }
  }

  Logout(islogout = false){
    debugger;
    if(islogout){
      let val = this.task.Logout();
      if(val){
        this.router.navigate(['/Home']);
      }
    }
  }
}
