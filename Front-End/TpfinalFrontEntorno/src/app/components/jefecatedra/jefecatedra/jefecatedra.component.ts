import { Component, OnInit } from '@angular/core';
import { JefecatedraService } from '../../../services/jefecatedra/jefecatedra.service';
import { JefedeCatedraMateria } from '../../../classes/jefedecatedra_materia';

declare var $: any;

@Component({
  selector: 'app-jefecatedra',
  templateUrl: './jefecatedra.component.html',
  styleUrls: ['./jefecatedra.component.css']
})
export class JefecatedraComponent implements OnInit {
  jcmlist :Array<JefedeCatedraMateria> = [];
  constructor(private jcatedra: JefecatedraService) { }

  ngOnInit(): void {
    this.GetAll();
  }
  GetAll(){
    this.jcatedra.GetAll(0).subscribe((comp) =>{
      this.jcmlist = comp;
      Active();
    });   
  }
}

function Active(){
  $('.actionmenu').removeClass('active');
  $('.Competition').addClass('active');
}
