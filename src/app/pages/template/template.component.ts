import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario={
    nombre: 'Tonatiuj',
    apellido: 'Sánchez',
    email: 'tonsanzjimz@gmail.com',
    pais: 'MEX',
    genero:'M'
  }
  paises:any[]=[];
  constructor( private _paisService: PaisService ) { }
  
  ngOnInit(): void {
    this._paisService.getPaises()
      .subscribe(
        ( paises ) =>{
          this.paises = paises;
          this.paises.unshift({
            nombre: '[Seleciones un Pais]',
            codigo: ''
          })

          console.log( paises );
        }
      );
  }
  
  guardar( forma: NgForm ){
    console.log(forma.valid);
    if( forma.invalid ){
      Object.values( forma.controls ).forEach(
        ( control ) =>{
          control.markAllAsTouched();
        });
      return;
    }

    
    console.log(forma.value);
    
    
  }
}
