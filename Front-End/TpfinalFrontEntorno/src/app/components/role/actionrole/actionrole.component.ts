import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../classes/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-actionrole',
  templateUrl: './actionrole.component.html',
  styleUrls: ['./actionrole.component.css']
})
export class ActionroleComponent implements OnInit {
  Option: string ="Crear permiso";
  role: Role = null;
  OptionBtn: boolean = false;
  browserForm: FormGroup;

  constructor(private roleService: RoleService, private fb:FormBuilder,
    private messageService: MessageService, private route: ActivatedRoute,
    private router:Router) {
    let id = this.route.snapshot.paramMap.get('id');
    if(id !== null){
      this.Option ="Actualizar permiso";
      this.OptionBtn = true;
      this.GetById(parseInt(id));
    }
    else{
      this.Option ="Crear permiso";
      this.OptionBtn = false;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm():void{
    this.browserForm = this.fb.group({
      id:0,
      name: ['',[Validators.required]],
      description:'',
      creationDate:'',
      state:''
    });
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

GetById(id){
  this.roleService.GetById(id).subscribe(result =>{
    this.role = JSON.parse(JSON.stringify(result));
    let roleid ={
      id:  this.role.id,
      name:  this.role.name,
      description:  this.role.description,
      creationDate:  this.role.creationDate,
      state:  this.role.state
    }
    this.browserForm.patchValue(roleid);
  })
}

  Create (){
    if(this.browserForm.valid) {
      if(this.OptionBtn == false){
        this.ActionCreate();
      }
      else{
        this.ActionUpdate();
      }
    }
    else {
      this.messageService.Error('Error',"Ingrese el nombre");
    }
  }

  ActionCreate(){
    this.roleService.Post(this.browserForm.value).subscribe((data:any) =>{
      debugger;
      if(data.response.status === 200){
        this.messageService.Success('Crear permiso', data.response.message);
        this.router.navigate(['/Role']);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
    });
  }

  ActionUpdate(){
    this.roleService.Put(this.browserForm.value).subscribe((data:any) =>{
      if(data.response.status === 200){
        this.messageService.Success('Actualizar permiso', data.response.message);
        this.router.navigate(['/Role']);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {

    });
  }
}
