import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/classes/subject';
import { User } from 'src/app/classes/user';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { UserService } from 'src/app/services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-actionjefecatedra',
  templateUrl: './actionjefecatedra.component.html',
  styleUrls: ['./actionjefecatedra.component.css']
})
export class ActionjefecatedraComponent implements OnInit {
  Option = 'Crear jefe de catedra';
  OptionBtn: boolean = false;
  subjectlist :Array<Subject> = [];
  usertlist :Array<User> = [];
  keyword = 'firstName';
  keywordsubject = 'name'

  constructor(private subservice: SubjectService, private userService: UserService) { }

  ngOnInit(): void {
   this.GetAll();
   this.GetAllUser();
  }

  GetAll(): void{
    this.subservice.GetAll().subscribe( (sub) =>{
      this.subjectlist = sub;
      Active();
    });
  }

  GetAllUser(): void{
    this.userService.GetAll().subscribe( (sub) =>{
      this.usertlist = sub;
      Active();
    });
  }
  selectEvent(item) {
    debugger;
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }
}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Jefedecatedra').addClass('active');
}
