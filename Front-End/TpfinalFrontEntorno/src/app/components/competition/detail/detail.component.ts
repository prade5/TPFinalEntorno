import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/classes/competition';
import { CompetitionService } from 'src/app/services/competition/competition.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  Competition: any;

  constructor( private route: ActivatedRoute, private competitionService: CompetitionService) { }

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
      // if (this.Competition != null){
      //   const competitionThis = {
      //     id:  this.Competition.id,
      //     creationDate: moment(this.Competition.creationDate).format("YYYY-MM-DDThh:mm"),
      //     finalDate: moment(this.Competition.finalDate).format("YYYY-MM-DDThh:mm"),
      //     idSubject:{
      //       creationDate:  moment(this.Competition.creationDate).format("YYYY-MM-DDThh:mm"),
      //       description: result.subdescription,
      //       finalDate: moment(this.Competition.finalDate).format("YYYY-MM-DDThh:mm"),
      //       id: result.idsub,
      //       idUser: result.idUser,
      //       img: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
      //       name: result.subname,
      //       state: "1"
      //     },
      //     idPosition:{
      //       description: result.posdescription,
      //       id:  result.idPosition,
      //       name: result.posname,
      //       state: "1" 
      //     },
      //     idUser:{
      //       idUser: result.idUser,
      //       idSubject: result.idSubject,
      //       firstName: result.firstName,
      //       id: result.jcmid,
      //       img: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
      //       lastName: result.lastName,
      //       name: result.subname
      //     },
      //     description:  this.Competition.description
      //   };

      //   this.dateCreateBind = new Date(this.Competition.creationDate).toISOString().slice(0, 16);
      //   this.dateFinalBind = new Date(this.Competition.finalDate).toISOString().slice(0, 16);
      //   this.browserForm.patchValue(competitionThis);
      // }

    });
  }
}
