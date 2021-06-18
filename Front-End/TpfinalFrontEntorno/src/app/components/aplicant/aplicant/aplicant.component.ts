import { Component, OnInit } from '@angular/core';
import { Applicant } from 'src/app/classes/applicant';
import { ApplicantService } from 'src/app/services/applicant/applicant.service';

@Component({
  selector: 'app-aplicant',
  templateUrl: './aplicant.component.html',
  styleUrls: ['./aplicant.component.css']
})
export class AplicantComponent implements OnInit {

  aplicantlist: Array<Applicant> = [];

  constructor(private applicant: ApplicantService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    debugger;
    this.applicant.GetAll().subscribe((applicant) =>{
      this.aplicantlist = applicant;
    });
  }

}
