import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../classes/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actionuser',
  templateUrl: './actionuser.component.html',
  styleUrls: ['./actionuser.component.css']
})
export class ActionuserComponent implements OnInit {
  Option: string ="Crear usuario";
  OptionBtn: boolean = false;
  rolelist :Array<Role> = [];

  browserForm: FormGroup;

  constructor(private roleService: RoleService, private fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.GetAllRole();
  }

  GetAllRole(){
    this.roleService.GetAll().subscribe((role) =>{
      this.rolelist = role;
    });
  }

}
