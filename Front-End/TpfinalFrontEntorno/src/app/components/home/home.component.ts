import { Component, OnInit } from '@angular/core';
import {  CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../classes/competition';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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