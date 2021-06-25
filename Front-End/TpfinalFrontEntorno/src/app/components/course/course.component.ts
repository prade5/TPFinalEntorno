import { Component, OnInit } from '@angular/core';
import { JefedeCatedraMateria } from '../../classes/jefedecatedra_materia';
import { JefecatedraService } from '../../services/jefecatedra/jefecatedra.service';
import { TaskService } from '../../services/auth/task.service';

declare var $: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  jcmlist :Array<JefedeCatedraMateria> = [];

  constructor(private jcatedraservice: JefecatedraService, private taskservice:TaskService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    this.jcatedraservice.GetAll(this.taskservice.GetIdUser()).subscribe((comp) =>{
      debugger;
      this.jcmlist = comp;
      Active();
    });   
  }
}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Course').addClass('active');
}
