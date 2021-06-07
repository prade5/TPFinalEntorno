import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../classes/role';
import { User } from '../../../classes/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-actionuser',
  templateUrl: './actionuser.component.html',
  styleUrls: ['./actionuser.component.css']
})
export class ActionuserComponent implements OnInit {
  Option: string ="Crear usuario";
  OptionBtn: boolean = false;
  rolelist :Array<Role> = [];
  user:User;

  browserForm: FormGroup;
  private isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  constructor(private roleService: RoleService, private fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
    this.GetAllRole();
  }

  GetAllRole(){
    this.roleService.GetAll().subscribe((role) =>{
      this.rolelist = role;
    });
  }
  private initForm():void{
    this.browserForm = this.fb.group({
      id:0,      
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      mail: ['',[Validators.required,Validators.pattern(this.isEmail)]],
      address:['',[Validators.required]],
      phone:['',[Validators.required]],
      idRole:['',[Validators.required]],
      userName:['',[Validators.required]],
      userPass:['',[Validators.required, Validators.minLength(6),Validators.maxLength(50),Validators.pattern('/^([a-z])/'),Validators.pattern('/^([A-Z])/')]],
      state:1
    });    
    let useract ={
      id:0,      
      firstname:'',
      lastname:'',
      mail: '',
      address:'',
      phone:'',
      idRole:'',
      userName:'0',
      userPass: '',
      state:1
    }
    this.browserForm.patchValue(useract);
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }
  Create (){
    if(this.browserForm.valid) {
      if(this.OptionBtn == false){
        // this.ActionCreate();
      }
      else{
        // this.ActionUpdate();
      }
    }
    else {
      // this.messageService.Error('Error',"Ingrese el nombre");
    }
  }
}
