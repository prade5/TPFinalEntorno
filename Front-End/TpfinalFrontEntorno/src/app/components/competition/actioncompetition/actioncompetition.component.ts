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
import * as moment from "moment";
import {TaskService} from "../../../services/auth/task.service";
import {StructureIsReused} from "@angular/compiler-cli/src/transformers/util";
import { JefecatedraService } from 'src/app/services/jefecatedra/jefecatedra.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/classes/user';

declare var $: any;

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
  usertlist :Array<User> = [];
  curUserId : number;
  curUserRole: string;
  dateCreateBind : string;
  
  subject: Subject[];
  keyword = 'firstName';
  keywordname = 'name';

  initialValueuser: any;
  initialValuesubject: any;
  initialValueJCM: any;

  dateFinalBind: string;
  isDisabled: boolean = false;
  validDates: boolean = true;
  rolactual: string;
  isadmCreateJC: boolean = false;
  idselectmateria:number = 0;

  constructor(private competitionService: CompetitionService, private subjectService: SubjectService, private positionService: PositionService, private fb: FormBuilder,
              private messageService: MessageService, private route: ActivatedRoute, private userFinder: TaskService,
              private router: Router,private jefeservice: JefecatedraService, private userService: UserService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.getIdUser()
    this.getMaterias();
    this.getPosiciones();
    if (id !== null){
      if(id.endsWith('v')){
        this.isDisabled = true;
        this.Option = 'Detalle Concurso';
      } else {
        this.isDisabled = false;
        this.Option = 'Actualizar Concurso';
      }
        this.OptionBtn = true;
        this.GetById(parseInt(id));
    }
    else{
      this.Option = 'Crear Concurso';
      this.OptionBtn = false;
    }
  }

  ngOnInit(): void {
    this.rolactual = this.userFinder.GetRole();
    this.initForm();
    this.GetAllJefeCatedra();
  }

  GetAllJefeCatedra(): void{
    this.userService.GetAll(true).subscribe( (sub) =>{
      debugger;
      this.usertlist = sub;
      Active();
    });
  }
  
  private initForm(): void{
    this.browserForm = this.fb.group({
      id: 0,
      idSubject: ['', [Validators.required]],
      description: '',
      creationDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      state: 1,
      idUser:'',
      idPosition: ['', Validators.required]
    });
  }

  compareDates() {
    var antes = this.browserForm.get('creationDate');
    var despues = this.browserForm.get('finalDate');
    var dantes = new Date(antes.value).toISOString().slice(0, 19).replace('T', ' ');
    var ddespues = new Date(despues.value).toISOString().slice(0, 19).replace('T', ' ');
    if(dantes < ddespues) {
      this.validDates = true;
    } else {
      this.validDates = false;
    }
  }
  
  selectEvent(item:any) {
    this.idselectmateria = item.id;
  }

  selectPosition(item:any) {
    debugger;
    if(this.rolactual === 'admin' && item.name !== 'Jefe de Catedra' && this.idselectmateria > 0){
      this.isadmCreateJC = true;
      this.jefeservice.GetAllByAdmin(this.idselectmateria).subscribe(result => {
        debugger;
        this.subject = JSON.parse(JSON.stringify(result));
      });
    }
    else{
      this.isadmCreateJC = false;
    }
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    const result = (!validatedField.valid && validatedField.touched) ?
      'is-invalid' : validatedField.touched ? 'is-valid' : '';
    return result;
  }

  getMaterias() {
    // if(this.curUserRole === 'admin') {
      this.subjectService.GetAll().subscribe(result => {
        this.catedras = JSON.parse(JSON.stringify(result));
      });
  }

  getPosiciones() {
    this.positionService.GetAll().subscribe(result => {
      this.posiciones = JSON.parse(JSON.stringify(result));
      Active();
    });
  }

  getIdUser(){
    this.curUserId =  this.userFinder.GetIdUser();
    this.curUserRole = this.userFinder.GetRole();
  }

  GetById(id){
    this.competitionService.GetById(id).subscribe((result:any) => {
      this.Competition = JSON.parse(JSON.stringify(result));
      debugger;
      if (this.Competition != null){
        const competitionThis = {
          id:  this.Competition.id,
          creationDate: moment(this.Competition.creationDate).format("YYYY-MM-DDThh:mm"),
          finalDate: moment(this.Competition.finalDate).format("YYYY-MM-DDThh:mm"),
          idSubject:{
            creationDate:  moment(this.Competition.creationDate).format("YYYY-MM-DDThh:mm"),
            description: result.subdescription,
            finalDate: moment(this.Competition.finalDate).format("YYYY-MM-DDThh:mm"),
            id: result.idsub,
            idUser: result.idUser,
            img: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
            name: result.subname,
            state: "1"
          },
          idPosition:{
            description: result.posdescription,
            id:  result.idPosition,
            name: result.posname,
            state: "1" 
          },
          idUser:{
            idUser: result.idUser,
            idSubject: result.idSubject,
            firstName: result.firstName,
            id: result.jcmid,
            img: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
            lastName: result.lastName,
            name: result.subname
          },
          description:  this.Competition.description
        };

        this.dateCreateBind = new Date(this.Competition.creationDate).toISOString().slice(0, 16);
        this.dateFinalBind = new Date(this.Competition.finalDate).toISOString().slice(0, 16);
        this.browserForm.patchValue(competitionThis);
      }

    });
  }
GetJCMAdmin(id){
  this.jefeservice.GetAllByAdmin(id).subscribe(result => {
    debugger;
    this.subject = JSON.parse(JSON.stringify(result));
  });
}
  Create(){
    debugger;
    // this.rolactual === 'admin' ? '' : this.userFinder.GetIdUser()
    if (this.browserForm.valid) {
      var competition ={
        id:this.browserForm.value.id,
        idPosition:parseInt(this.browserForm.value.idPosition.id),
        idSubject:parseInt(this.browserForm.value.	idSubject.id),
        description:this.browserForm.value.description,
        idUser: this.browserForm.value.idUser === "" ? this.curUserId : (this.browserForm.value.idUser.idUser!= undefined ? this.browserForm.value.idUser.idUser : this.browserForm.value.idUser),
        creationDate:this.browserForm.value.creationDate,
        finalDate:this.browserForm.value.finalDate,
        state:this.browserForm.value.state
      }

      if (this.OptionBtn === false){
        this.ActionCreate(competition);
      }
      else{
        this.ActionUpdate(competition);
      }
    }
    // else {
    //   this.messageService.Error('Error', 'Ingrese el nombre');
    // }
  }

  ActionCreate(competition){
    debugger;
    this.competitionService.Post(competition).subscribe((data: any) => {
      debugger;
        if (data.response.status === 200){
          this.messageService.Success('Crear concurso', data.response.message);
          this.isDisabled = true;
          setTimeout(()=>{
            this.router.navigate(['/Competition']);
          }, 5000);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {
        debugger;
            console.log(err);
      });
  }

  ActionUpdate(competition) {
    this.competitionService.Put(competition).subscribe((data: any) => {
        if (data.response.status === 200){
          this.messageService.Success('Actualizar concurso', data.response.message);
          this.isDisabled = true;
          setTimeout(()=>{
            this.router.navigate(['/Competition']);
          }, 5000);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {

      });
  }
}
function Active(){
  $('.actionmenu').removeClass('active');
  $('.Competition ').addClass('active');
}
