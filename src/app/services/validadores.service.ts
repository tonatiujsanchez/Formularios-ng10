import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  
  usuarioExistente( control: FormControl ): Promise<any> | Observable<any> {
    if( !control.value ){
      return Promise.resolve( null );
    }
    
    return new Promise(
      ( resolve, reject ) =>{
        setTimeout( () =>{
          if( control.value === 'ton' ){
            resolve({ exite: true });
          }else{
            resolve( null )
          }
        }, 3500);
      }
    );
  }

  noSanchez( control: FormControl ): { [s:string]: boolean } {
    if( control.value?.toLowerCase() === 'sanchez' ){
      return{
        noSanchez: true
      }
    }
    return null;
  }

  pwdIguales( pwd1Name: string, pwd2Name: string ){

    return ( formGroup: FormGroup ) =>{
      const pass1Control = formGroup.controls[pwd1Name];
      const pass2Control = formGroup.controls[pwd2Name];
      
      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      } else{
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }


}
