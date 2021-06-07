import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  complist :Array<Competition> = [];

  constructor(private comp: CompetitionService) { }

  ngOnInit(): void {
    this.GetAll();
  }


  GetAll(){
    debugger;
    this.comp.GetAll().subscribe((comp) =>{
      this.complist = comp;
      debugger;
    });
  }

}
