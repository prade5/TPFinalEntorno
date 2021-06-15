import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';
import { Subject } from '../../../classes/subject';
import { SubjectService } from '../../../services/subject/subject.service';
import { DynamicphotoService } from '../../../services/dynamicphoto/dynamicphoto.service';
import { TaskService } from '../../../services/auth/task.service';

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
  photolist :Array<any> = [];
  photostring:string;

  constructor(private fb:FormBuilder, private subservice:SubjectService,
    private messageService: MessageService, private route: ActivatedRoute,
    private router:Router, private photoservice: DynamicphotoService, private taskservice:TaskService) {
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
    this.GetAllPhotoDefault();
  }

  private initForm():void{
    var f = new Date();
    var fecha = f.getDate() + "-"+ f.getMonth()+ "-" + f.getFullYear();
    this.form  = this.fb.group({
      id:0,
      name: ['',[Validators.required]],
      description:'',
      creationDate: fecha,
      idUser: this.taskservice.GetIdUser(),
      img:'',
      state:1
    });
  }
  GetAllPhotoDefault(): void {
    this.photoservice.GetAll().subscribe( (photo) =>{
      this.photolist = photo;
    });
  }
  isValidField(field: string): string{
    const validatedField = this.form .get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  GetById(id){
    this.subservice.GetById(id).subscribe((result:any) =>{
      // this.role = JSON.parse(JSON.stringify(result));
      // let roleid ={
      //   id:  this.role.id,
      //   name:  this.role.name,
      //   description:  this.role.description,
      //   creationDate:  this.role.creationDate,
      //   state:  this.role.state
      // }
      this.photostring = result.img;
      this.form.patchValue(result);
    })
  }

  SelectPhoto(photo):void{
    this.photostring = photo.url;
    this.form.value.img = this.photostring;
    $('.modal').modal('toggle');
  }

  onFileChanged(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this, "Id");
    reader.readAsBinaryString(file);
  }

  handleReaderLoaded(readerEvt:string, indicator:any ) {
    var binaryString = indicator.target.result;
    if (readerEvt == "Id") {
      this.photostring = "data:image/jpeg;base64," +btoa(binaryString);
      this.form.value.img = this.photostring;
      $('.modal').modal('toggle');
    }
  }

  Create (){
    debugger;
    if(this.form.valid) {
      if(this.OptionBtn == false){
        this.ActionCreate();
      }
      else{
        this.ActionUpdate();
      }
    }
  }

  ActionCreate(){
    this.subservice.Post(this.form .value).subscribe((data:any) =>{
      debugger;
      if(data.response.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/Subject']);
        }, 5000);
        this.messageService.Success('Crear materia', data.response.message);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      this.messageService.Error('Error', err.error.message);
    });
  }

  ActionUpdate(){
    this.subservice.Put(this.form .value).subscribe((data:any) =>{
      if(data.response.status === 200){ 
        setTimeout(()=>{
          this.router.navigate(['/Subject']);
        }, 5000);
        this.messageService.Success('Actualizar materia', data.response.message);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      this.messageService.Error('Error', err.error.message);
    });
  }
}
function Active(){
  $('.actionmenu').removeClass('active');
  $('.Subject').addClass('active');
}