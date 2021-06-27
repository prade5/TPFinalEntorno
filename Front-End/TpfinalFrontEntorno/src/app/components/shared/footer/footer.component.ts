import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/auth/task.service';
import { PerfilphotoService } from 'src/app/services/user/perfilphoto.service';
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
  profilphoto:any;
  
  constructor(private task: TaskService, private router: Router,
    private perfilphotoService:PerfilphotoService) { }

  ngOnInit(): void {
    this.GetProfilphotoById(10);
  }

  GetProfilphotoById(id){
    this.perfilphotoService.GetById(id).subscribe((result:any) =>{
      this.profilphoto = result.url;
    })
  }
  LogoutEmitter(){
    this.Logout.emit(true);
  }
}
