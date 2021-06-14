import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { Subject } from '../../../classes/subject';
import { SubjectService } from '../../../services/subject/subject.service';

declare var $: any;

@Component({
  selector: 'app-actionsubject',
  templateUrl: './actionsubject.component.html',
  styleUrls: ['./actionsubject.component.css']
})
export class ActionsubjectComponent implements OnInit {
  Option: string ="Crear materia";
  subject: Subject = null;
  OptionBtn: boolean = false;
  form : FormGroup;

  constructor(private fb:FormBuilder, private subservice:SubjectService,
    private messageService: MessageService, private route: ActivatedRoute,
    private router:Router) {
      let id = this.route.snapshot.paramMap.get('id');
      if(id !== null){
        this.Option ="Actualizar materia";
        this.OptionBtn = true;
        this.GetById(parseInt(id));
      }
      else{
        this.Option ="Crear materia";
        this.OptionBtn = false;
      }
    Active();
   }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm():void{
    this.form  = this.fb.group({
      id:0,
      name: ['',[Validators.required]],
      description:'',
      creationDate:'',
      idUser:0,
      img:'',
      state:''
    });
  }

  isValidField(field: string): string{
    const validatedField = this.form .get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  GetById(id){
    this.subservice.GetById(id).subscribe(result =>{
      // this.role = JSON.parse(JSON.stringify(result));
      // let roleid ={
      //   id:  this.role.id,
      //   name:  this.role.name,
      //   description:  this.role.description,
      //   creationDate:  this.role.creationDate,
      //   state:  this.role.state
      // }
      // this.frForm.patchValue(roleid);
    })
  }

  Create (){
    if(this.form .valid) {
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
    this.subservice.Post(this.form .value).subscribe((data:any) =>{
      debugger;
      if(data.response.status === 200){
        this.messageService.Success('Crear materia', data.response.message);
        this.router.navigate(['/Subject']);
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
    this.subservice.Put(this.form .value).subscribe((data:any) =>{
      if(data.response.status === 200){
        this.messageService.Success('Actualizar materia', data.response.message);
        this.router.navigate(['/Subject']);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {

    });
  }
}
function Active(){
  $('.actionmenu').removeClass('active');
  $('.Subject').addClass('active');
}