import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ProfilService } from '../../../services/user/profil.service';
import { KownlageService } from '../../../services/user/kownlage.service';
import { PerfilphotoService } from '../../../services/user/perfilphoto.service';
import { Document } from '../../../classes/document';
import { DocumenttypeService } from '../../../services/documenttype/documenttype.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../../../services/auth/task.service';

declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  browserForm: FormGroup;
  perfilForm: FormGroup;
  
  idperfil = 0 ;
  user:any;
  profiluser:any;
  profilphoto:any;
  kownlageuser:any;

  titleModal: string;
  actionbtn:string;
  doclist :Array<Document> = [];
  userPerfilName:string;
  photolist :Array<any> = [];

  isPerfilCreate:boolean = true;

  constructor(private route: ActivatedRoute,private userService: UserService, private fb:FormBuilder,
    private profilservice: ProfilService, private kownservice: KownlageService,private messageService: MessageService,
    private perfilphotoService:PerfilphotoService,private docservice:DocumenttypeService,
    private taskService:TaskService) { 
    this.idperfil = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.initForm();
    this.profilForm();
    this.LoadAll();
  }

 LoadAll():void{
  this.GetById(this.idperfil);
  this.GetProfilById(this.idperfil);
  this.GetAllKownlage(this.idperfil);
  this.GetProfilphotoById(2);
  this.GetAllPhotoDefault();
 }
  GetById(id){
    this.userService.GetById(id).subscribe((result:any) =>{
      this.user = result;
      this.browserForm.patchValue(this.user);
    })
  }

  GetProfilById(id){
    this.profilservice.GetById(id).subscribe((result:any) =>{
debugger;
      if(result !== ""){
        this.isPerfilCreate = false;
      }
      this.profiluser = result;      
      this.perfilForm.patchValue(this.profiluser);
    })
  }
  GetProfilphotoById(id){
    this.perfilphotoService.GetById(id).subscribe((result:any) =>{
      this.profilphoto = result;
    })
  }
  GetAllKownlage(idUser){
    this.kownservice.GetAll(idUser).subscribe((result:any) =>{
      debugger;
      this.kownlageuser = result;
    })
  }
  GetAllDocument(){
    this.docservice.GetAll().subscribe((role) =>{
      this.doclist = role;
    });
  }
  
  GetAllPhotoDefault(): void {
    this.perfilphotoService.GetAll().subscribe( (photo) =>{
      this.photolist = photo;
    });
  }
  onFileChanged(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = this.handleReaderLoaded.bind(this, "Id");
    reader.readAsBinaryString(file);
  }

  handleReaderLoaded(readerEvt:string, indicator:any ) {
    var binaryString = indicator.target.result;
    if (readerEvt == "Id") {
      this.profilphoto.url = "data:image/jpeg;base64," +btoa(binaryString);
      this.perfilForm.value.img = this.profilphoto.url;
      $('.modal').modal('toggle');
    }
  }

  SelectPhoto(photo):void{
    this.profilphoto.url = photo.url;
    this.perfilForm.value.img = this.profilphoto.url;
    $('#photoperfil').modal('toggle');
  }

  private initForm():void{
    this.browserForm = this.fb.group({
      id:this.idperfil,      
      idDocumentType: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      docNumber: ['',[Validators.required]],
      mail: [''],
      address:['',[Validators.required]],
      phone:['',[Validators.required]],
      idRole:['',[Validators.required]],
      idUser:this.idperfil,    
      state:1
    });  
  }

  private profilForm():void{
    this.perfilForm = this.fb.group({
      id:0,
      idUser:this.idperfil,      
      workplace: '',
      title: '',
      img:'',
      facebook:'',
      gitHub:'',
      instagram:'',
      twitter:'',
      website:'',
      state:1
    });  
  }

  isValidField(field: string): string{
    const validatedField = this.browserForm.get(field);
    let result = (!validatedField.valid && validatedField.touched) ?
    'is-invalid': validatedField.touched ? 'is-valid':'';
    return result;
  }
  ActionUpdateUser():void{
    this.GetAllDocument();
    this.GetById(this.idperfil);
    this.actionbtn ='user';
    this.titleModal = "Actualizar usuario"
  }
  ActionPerfil():void{    
    this.actionbtn ='perfil'; 
    this.userPerfilName = this.taskService.GetUserName();

    if(!this.isPerfilCreate){
      this.titleModal = "Actualizar perfil usuario"
    }
    else{
      this.titleModal = "Agregar perfil usuario"
    }    
  }
  ActionKnowlage(id):void{
    this.actionbtn ='knowlage';
    if(id === 0){
      this.titleModal = "Agregar conocimiento"
    }
    else{
      this.titleModal = "Actualizar conocimiento"
    }
  }
  
  DeleteKnowlage(id):void{
    this.titleModal = "Actualizar conocimiento"
  }

  UpdateUser(){
    debugger;
    if(this.browserForm.valid) {
      this.userService.Put(this.browserForm.value).subscribe((data:any) =>{
        if(data.response.status === 200){
          setTimeout(()=>{         
            $('.modal').modal('toggle');
          }, 5000);
          this.GetById(this.idperfil);         
          this.messageService.Success('Actualizar Usuario', data.response.message);
        }
        else{
          this.messageService.Error('Error', data.response.message);
        }
      },
      (err: HttpErrorResponse) => {
        this.messageService.Error('Error', err.error.message);
      });
    }
  }

  CreateOrUpdatePerfil():void{
    if(this.perfilForm.value.title !== null){
      if(!this.isPerfilCreate){
        this.UpdatePerfil();
      }
      else{
        this.CreatePerfil();
      } 
    }
    else{
      this.messageService.Error('Error', "Debe ingresar el puesto");
    }
  }

  CreatePerfil():void{
    debugger;
    this.profilservice.Post(this.perfilForm.value).subscribe((data:any) =>{
      debugger;
      if(data.response.status === 200){
        setTimeout(()=>{         
          $('#exampleModal').modal('toggle');
        }, 5000);
        this.GetById(this.idperfil);         
        this.messageService.Success('Crear perfil', data.response.message);
      }
      else{
        debugger;
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }

  UpdatePerfil():void{
    this.profilservice.Put(this.perfilForm.value).subscribe((data:any) =>{
      debugger;
      if(data.response.status === 200){
        setTimeout(()=>{         
          $('#exampleModal').modal('toggle');
        }, 5000);
        this.GetById(this.idperfil);         
        this.messageService.Success('Actualizar perfil', data.response.message);
      }
      else{
        debugger;
        this.messageService.Error('Error', data.response.message);
      }
    },
    (err: HttpErrorResponse) => {
      debugger;
      this.messageService.Error('Error', err.error.message);
    });
  }
}