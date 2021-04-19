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
    this.initForm();
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
    debugger;
    this.role = JSON.parse(JSON.stringify(result));
    // this.browserForm.value(this.role.name)
    let val = this.role[0];
    let roleid ={
      id:  this.role[0].id,
      name:  this.role[0].name,
      description:  this.role[0].description,
      creationDate:  this.role[0].creationDate,
      state:  this.role[0].state
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
      if(data.result === 'Ok'){
        this.messageService.Success('Crear permiso', data.message);
        this.router.navigate(['/Role']);
      }
      else{
        this.messageService.Error('Error', data.message);
      }
    },
    (err: HttpErrorResponse) => {

    });
  }

  ActionUpdate(){
    this.roleService.Put(this.browserForm.value).subscribe((data:any) =>{
      if(data.result === 'Ok'){
        this.messageService.Success('Actualizar permiso', data.message);
        this.router.navigate(['/Role']);
      }
      else{
        this.messageService.Error('Error', data.message);
      }
    },
    (err: HttpErrorResponse) => {

    });
  }
}
