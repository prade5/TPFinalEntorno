import { Component, OnInit } from '@angular/core';
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
  OptionBtn: boolean = false;
  browserForm: FormGroup;

  constructor(private roleService: RoleService, private fb:FormBuilder,
    private messageService: MessageService) {
    this.initForm();
  }

  ngOnInit(): void {
  }
  private initForm():void{
    this.browserForm = this.fb.group({
      name: ['',[Validators.required]],
      description:''
    });
  }
  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }
  Create (){
    if(this.browserForm.valid) {

      this.roleService.Post(this.browserForm.value).subscribe((data:any) =>{
        debugger;
        if(data.result === 'Ok'){
          this.messageService.Success('Crear permiso', data.message);
        }
      },
      (err: HttpErrorResponse) => {

      });
    }

  }
}
