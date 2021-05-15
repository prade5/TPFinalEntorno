import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../classes/role';
import { from } from 'rxjs';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [ConfirmationService]
})
export class RoleComponent implements OnInit {
  rolelist :Array<Role> = [];
  msgs: Message[] = [];
  position: string;
  constructor(private roleService: RoleService,private confirmationService: ConfirmationService,
             private primengConfig: PrimeNGConfig) {
             }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.GetAll();
  }

  GetAll(){
    debugger;
    this.roleService.GetAll().subscribe((role) =>{
      this.rolelist = role;
    });
  }

  Delete(id){
    debugger;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
  }
}
