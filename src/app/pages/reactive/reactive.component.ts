import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  
  forma: FormGroup;
  constructor( private formBuilder: FormBuilder,
               private validadores:ValidadoresService ) { 
    this.iniciarFormulario();
    this.cargarDataFormulario();
    this.crearListeners();
    
  }

  ngOnInit(): void {
  }
  
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  get estadoNoValido(){
    return this.forma.get('direccion.estado').invalid && this.forma.get('direccion.estado').touched;
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }


  get pwd1NoValido(){
    return this.forma.get('pwd1').invalid && this.forma.get('pwd1').touched;
  }
  get pwd2NoValido(){
    const pass1= this.forma.get('pwd1').value;
    const pass2= this.forma.get('pwd2').value;
    return ( pass1 === pass2 ) ? false : true;
  }



  iniciarFormulario(){
    this.forma = this.formBuilder.group({
      nombre  : [ '',
                  [
                    Validators.required, 
                    Validators.minLength(5)
                  ]
                ],
      apellido: ['', 
                  [
                    Validators.required,
                    Validators.minLength(5),
                    this.validadores.noSanchez
                  ] 
                ],
      correo  : ['',
                  [ 
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                  ]
                ],
      usuario :[ '', Validators.required, this.validadores.usuarioExistente ],
      pwd1    :[ '', Validators.required ],
      pwd2    :[ '', Validators.required ],
      direccion: this.formBuilder.group({
        estado: ['', Validators.required ],
        ciudad: ['', Validators.required ]
      }),
      pasatiempos: this.formBuilder.array([])
    },
    {
      validators: this.validadores.pwdIguales( 'pwd1', 'pwd2' )
    });
  }
  
  crearListeners(){
    //valores del formulario
    this.forma.valueChanges.subscribe(
      ( valor ) =>{
        console.log( valor );
      }
    );
   // estado del formulario
    this.forma.statusChanges.subscribe( console.log );
    
    //Valor de algun campo del formulario
    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  cargarDataFormulario(){

    // this.forma.setValue({  // 'setValue' requiere que todos los campos tengan un valor por defecto
    this.forma.reset({        // 'reset' no requiere que todos los campos tengan un valor por defecto
      nombre: 'Tonatiuj',
      apellido: 'Sáncheze',
      correo: 'tonatiuj@gmail.com',
      pwd1: 'holamundo',
      pwd2: 'holamundo',
      direccion: {
        estado: 'Gro',
        ciudad: 'Tlapa'
      }
    });

    // agregar valores por defecto al arreglo de pasatiempos
    ['Programar', 'Entrenar'].forEach(
      (pasatiempo) =>{
        this.pasatiempos.push(
          this.formBuilder.control( pasatiempo )
        )
      }
    );
  }

  agregarPasatiempo(){
    this.pasatiempos.push(
      this.formBuilder.control('')
    )
  }

  borrarPasatiempo( idx: number ){
    this.pasatiempos.removeAt(idx);
  }

  guardar(){
    console.log( this.forma.valid );

    if( this.forma.invalid ){
      return Object.values( this.forma.controls )
        .forEach(
          (control) =>{

            if( control instanceof FormGroup ){
              Object.values( control.controls )
                .forEach(
                  (control) =>{
                    control.markAsTouched();
                  }
                );
            }else{
              control.markAsTouched();
            }

          }
        );
    }

    console.log( this.forma.value );

    //limpiar formulario
    this.forma.reset({
      nombre: 'nombre'
    });
  }
  
  




}
