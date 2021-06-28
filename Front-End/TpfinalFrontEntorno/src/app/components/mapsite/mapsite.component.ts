import { Component, OnInit } from '@angular/core';
import { MenuService} from '../../services/menu/menu.service';
import { TaskService } from 'src/app/services/auth/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapsite',
  templateUrl: './mapsite.component.html',
  styleUrls: ['./mapsite.component.css']
})
export class MapsiteComponent implements OnInit {
 MenuList:any;
  constructor(private task: TaskService,private menuservice: MenuService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetAlMenu();
  }

  GetAlMenu(){
    if (this.task.loggedIn()) {
      this.MenuList =  this.menuservice.GetMenu(this.task.GetRole().toLowerCase());
   } 
   else {
     this.router.navigate(['/error']);
     return;
   } 
 }
}
