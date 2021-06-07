import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/auth/task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  visible: boolean = true;
  @Output() menu: EventEmitter<any> = new EventEmitter();
  @Output() Logout: EventEmitter<any> = new EventEmitter();
  @Input() menunav:any;
  @Input() linkprincipal:any;

  constructor(
    private task: TaskService,
    private router: Router) { }

  ngOnInit(): void {
  }
  LogoutEmitter(){
    this.Logout.emit(true);
  }
}