import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/classes/competition';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  Competition: any;

  constructor( private route: ActivatedRoute, private competitionService: CompetitionService, private location: Location) { }

  ngOnInit(): void {
    debugger;
    const id = this.route.snapshot.paramMap.get('id');
    this.GetById(id);
  }
  GetById(id){
    this.competitionService.GetById(id).subscribe((result:any) => {
      debugger;
      this.Competition = JSON.parse(JSON.stringify(result));
      console.log(this.Competition);
      debugger;
    });
  }

  back(): void {
    this.location.back()
  }
}
