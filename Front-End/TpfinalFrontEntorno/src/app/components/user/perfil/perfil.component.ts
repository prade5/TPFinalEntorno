import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ProfilService } from '../../../services/user/profil.service';
import { KownlageService } from '../../../services/user/kownlage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  idperfil = 0 ;
  user:any;
  profiluser:any;
  kownlageuser:any;

  constructor(private route: ActivatedRoute,private userService: UserService,
    private profilservice: ProfilService, private kownservice: KownlageService) { 
    this.idperfil = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.GetById(this.idperfil);
    this.GetProfilById(this.idperfil);
    this.GetAllKownlage();
  }

  GetById(id){
    this.userService.GetById(id).subscribe((result:any) =>{
      this.user = result;
    })
  }

  GetProfilById(id){
    this.profilservice.GetById(id).subscribe((result:any) =>{
      this.profiluser = result;
    })
  }

  GetAllKownlage(){
    this.kownservice.GetAll().subscribe((result:any) =>{
      debugger;
      this.kownlageuser = result;
    })
  }
}
