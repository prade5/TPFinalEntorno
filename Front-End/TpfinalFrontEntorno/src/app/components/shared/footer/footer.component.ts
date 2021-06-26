import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/auth/task.service';
import { MenuadminComponent } from '../../menu/menuadmin/menuadmin.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  visible: boolean = true;
  @Output() menu: EventEmitter<any> = new EventEmitter();
  @Output() Logout: EventEmitter<any> = new EventEmitter();
  @Input() menunav:any;
  @Input() linkprincipal:any;
  @Input() linkperfil:any;
  
  constructor(private task: TaskService, private router: Router) { }

  ngOnInit(): void {

  }
  LogoutEmitter(){
    this.Logout.emit(true);
  }

}
