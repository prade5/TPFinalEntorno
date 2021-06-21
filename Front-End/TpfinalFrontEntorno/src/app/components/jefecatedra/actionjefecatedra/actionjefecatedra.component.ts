import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'rxjs/operators';
import { Subject } from 'src/app/classes/subject';
import { User } from 'src/app/classes/user';
import { MessageService } from 'src/app/services/message/message.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { UserService } from 'src/app/services/user/user.service';
import { JefecatedraService } from '../../../services/jefecatedra/jefecatedra.service';

declare var $: any;

@Component({
  selector: 'app-actionjefecatedra',
  templateUrl: './actionjefecatedra.component.html',
  styleUrls: ['./actionjefecatedra.component.css']
})
export class ActionjefecatedraComponent implements OnInit {
  @ViewChild('object') object;
  Option = 'Asignar jefe de catedra';
  OptionBtn: boolean = false;
  subjectlist :Array<Subject> = [];
  usertlist :Array<User> = [];
  keyword = 'firstName';
  keywordsubject = 'name'
  browserForm: FormGroup;
  initialValue: any;
  initialValueuser: any;

  constructor(private subservice: SubjectService, private userService: UserService,
    private messageService: MessageService, private fb:FormBuilder,private router:Router,
    private jefeservice: JefecatedraService, private route: ActivatedRoute) { 
      let id = this.route.snapshot.paramMap.get('id');
      Active();
      if(id !== null){
        this.Option ="Actualizar jefe de catedra";
        this.OptionBtn = true;
        this.GetByIJCM(parseInt(id));
      }
      else{
        this.Option ="Asignar jefe de catedra";
        this.OptionBtn = false;
      }
    }

  ngOnInit(): void {
    this.initForm();
   this.GetAll();
   this.GetAllJefeCatedra();
  }

  GetAll(): void{
    this.subservice.GetAll().subscribe( (sub) =>{
      this.subjectlist = sub;
      Active();
    });
  }

  GetAllJefeCatedra(): void{
    this.userService.GetAll(true).subscribe( (sub) =>{
      this.usertlist = sub;
      Active();
    });
  }
  
  GetByIJCM(id){
    debugger;
    this.jefeservice.GetById(id).subscribe((result:any) =>{
      debugger;
      var subject = {
        IdSubject:{          
          Id:result.Id,
          name:result.name,
          id:result.IdSubject
        }
      }

      var IdJefeDeCatedra = {
        IdJefeDeCatedra:{      
          Id:result.Id,
          firstName:result.firstName,
          id:result.IdJefeDeCatedra
        }
      }

      debugger;
      this.browserForm.patchValue(subject);
      this.browserForm.patchValue(IdJefeDeCatedra);
      // this.initialValue = result.name;
      // this.initialValueuser = result.firstName;
    })
  }
  selectEvent(item) {
    debugger;
    // $('.material-icons').on('click', function(){
    //   ng-pristine
    //   debugger;
    // });
    // do something with selected item
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    debugger;
    // do something when input is focused
  }
  private initForm():void{
    this.browserForm = this.fb.group({
      Id:0,      
      IdJefeDeCatedra: ['',[Validators.required]],
      IdSubject: ['',[Validators.required]],
      state:1
    });  
  }
  Create (){
    let jcm = this.browserForm.value;
    debugger;
    // let isvalid = this.browserForm.valid;
    var subjselect =$($('.subjselect').find('.ng-touched')).val();    
    let userselect = $($('.userselect').find('.ng-touched')).val();
    if(this.browserForm.valid) {
      var jefecatedra ={
        IdJefeDeCatedra:this.browserForm.value.IdJefeDeCatedra.id,
        IdSubject:this.browserForm.value.IdSubject.id,
        Id:this.OptionBtn == false ? this.browserForm.value.Id: this.browserForm.value.IdJefeDeCatedra.Id,
        state:this.browserForm.value.state
      }
      if(this.OptionBtn == false){
        this.ActionCreate(jefecatedra);
      }
      else{
        this.ActionUpdate(jefecatedra);
      }
    }
  }
  
  ActionCreate(jefecatedra){
    this.jefeservice.Post(jefecatedra).subscribe((data:any) =>{
      debugger;
      if(data.response.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/jefedecatedra_materia']);
        }, 5000);
        this.messageService.Success('Asignar jefe de catedra', data.response.message);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }

  ActionUpdate(jefecatedra){
    this.jefeservice.Put(jefecatedra).subscribe((data:any) =>{
      if(data.response.status === 200){
        setTimeout(()=>{
          this.router.navigate(['/jefedecatedra_materia']);
        }, 5000);
        this.messageService.Success('Actualizar jefe de catedra', data.response.message);
      }
      else{
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }
}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Jefedecatedra').addClass('active');
}
