import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../classes/role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  rolelist :Array<Role> = [];
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.roleService.GetAll().subscribe((role) =>{
      this.rolelist = role;
    });
  }
}
