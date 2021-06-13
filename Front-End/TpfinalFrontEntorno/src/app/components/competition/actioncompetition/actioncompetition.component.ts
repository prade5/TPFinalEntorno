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

  catedras: Subject[] = [
    {id: 1, name: 'Algebra y geometria', creationDate: new Date(), description: 'Good Description', finalDate: null, img: null, state: 1, idUser: 1},
    {id: 2, name: 'Analisis 1', creationDate: new Date(), description: 'Good Description', finalDate: null, img: null, state: 1, idUser: 1},
    {id: 3, name: 'Quimica', creationDate: new Date(), description: 'Good Description', finalDate: null, img: null, state: 1, idUser: 1}
  ];

  posiciones: Position[] = [
    {id: 1, name: 'Jefe de catedra', state: 1, description: 'Good Desctiption' },
    {id: 2, name: 'Profesor', state: 1, description: 'Good Desctiption' },
    {id: 3, name: 'Ayudante', state: 1, description: 'Good Desctiption'}
  ];


  constructor(private competitionService: CompetitionService, private fb: FormBuilder,
              private messageService: MessageService, private route: ActivatedRoute,
              private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
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
      id: 0,
      name: ['', [Validators.required]],
      description: '',
      creationDate: '',
      state: ''
    });
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    const result = (!validatedField.valid && validatedField.touched) ?
      'is-invalid' : validatedField.touched ? 'is-valid' : '';
    return result;
  }

  GetById(id){
    this.competitionService.GetById(id).subscribe(result => {
      this.Competition = JSON.parse(JSON.stringify(result));
      const competitionThis = {
        id:  this.Competition.id,
        idSubject: this.Competition.idSubject,
        name:  this.Competition.name,
        img: this.Competition.img,
        description:  this.Competition.description,
        creationDate:  this.Competition.creationDate,
        state:  this.Competition.state
      };
      this.browserForm.patchValue(competitionThis);
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
    this.competitionService.Post(this.browserForm.value).subscribe((data: any) => {
        debugger;
        if (data.response.status === 200){
          this.messageService.Success('Crear permiso', data.response.message);
          this.router.navigate(['/Role']);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {
        debugger;
      });
  }

  ActionUpdate() {
    this.competitionService.Put(this.browserForm.value).subscribe((data: any) => {
        if (data.response.status === 200){
          this.messageService.Success('Actualizar permiso', data.response.message);
          this.router.navigate(['/Role']);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {

      });
  }
}
