import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../services/role/role.service";
import {MessageService} from "../../../services/message/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Competition} from "../../../classes/competition";
import {CompetitionService} from "../../../services/competition/competition.service";
import {Subject} from "../../../classes/subject";
import {Position} from "../../../classes/position";
import {SubjectService} from "../../../services/subject/subject.service";
import {PositionService} from "../../../services/position/position.service";
import {SelectItem} from 'primeng/api';
import * as moment from "moment";

@Component({
  selector: 'app-actioncompetition',
  templateUrl: './actioncompetition.component.html',
  styleUrls: ['./actioncompetition.component.css']
})
export class ActioncompetitionComponent implements OnInit {
  Option = 'Crear Concurso';
  Competition: Competition = null;
  OptionBtn = false;
  browserForm: FormGroup;
  catedras: Subject[];
  posiciones: Position[];
  dateCreateBind : string;
  dateFinalBind: string;

  constructor(private competitionService: CompetitionService, private subjectService: SubjectService, private positionService: PositionService, private fb: FormBuilder,
              private messageService: MessageService, private route: ActivatedRoute,
              private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.getMaterias();
    this.getPosiciones();
    if (id !== null){
      this.Option = 'Actualizar Concurso';
      this.OptionBtn = true;
      this.GetById(parseInt(id));
    }
    else{
      this.Option = 'Crear Concurso';
      this.OptionBtn = false;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this.browserForm = this.fb.group({
      id: 1,
      idSubject: 0,
      description: '',
      creationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      finalDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      state: 1,
      idUser: 4,
      idPosition: 0
    });
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    const result = (!validatedField.valid && validatedField.touched) ?
      'is-invalid' : validatedField.touched ? 'is-valid' : '';
    return result;
  }

  getMaterias() {
    this.subjectService.GetAll().subscribe(result => {
      this.catedras = JSON.parse(JSON.stringify(result));
    });
  }

  getPosiciones() {
    this.positionService.GetAll().subscribe(result => {
      this.posiciones = JSON.parse(JSON.stringify(result));
    });
  }

  GetById(id){
    this.competitionService.GetById(id).subscribe(result => {
      this.Competition = JSON.parse(JSON.stringify(result));
      if (this.Competition != null){
        const competitionThis = {
          id:  this.Competition.id,
          creationDate: moment(this.Competition.creationDate).format("YYYY-MM-DDThh:mm"),
          finalDate: moment(this.Competition.finalDate).format("YYYY-MM-DDThh:mm"),
          idSubject: this.Competition.idSubject,
          idPosition: this.Competition.idPosition,
          description:  this.Competition.description
        };
        this.dateCreateBind = new Date(this.Competition.creationDate).toISOString().slice(0, 16);
        this.dateFinalBind = new Date(this.Competition.finalDate).toISOString().slice(0, 16);
        this.browserForm.patchValue(competitionThis);
      }

    });
  }

  Create(){
    if (this.browserForm.valid) {
      if (this.OptionBtn === false){
        this.ActionCreate();
      }
      else{
        this.ActionUpdate();
      }
    }
    else {
      this.messageService.Error('Error', 'Ingrese el nombre');
    }
  }

  ActionCreate(){
    console.log(this.browserForm.value);
    this.competitionService.Post(this.browserForm.value).subscribe((data: any) => {
        if (data.response.status === 200){
          console.log("Se creo");
          this.messageService.Success('Crear concurso', data.response.message);
          this.router.navigate(['/Competition']);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {
            console.log(err);
      });
  }

  ActionUpdate() {
    this.competitionService.Put(this.browserForm.value).subscribe((data: any) => {
        if (data.response.status === 200){
          this.messageService.Success('Actualizar concurso', data.response.message);
          this.router.navigate(['/Competition']);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {

      });
  }
}
