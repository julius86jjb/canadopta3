import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

declare function iniciar_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  h2 {
    float:center;
    margin-top: 20px;
    color: #fff;
    margin-bottom: 0px;
    font-size: 35px;
    font-weight: 700;
    letter-spacing: normal;
  }
  .swal-button {
    background-color: #b3c211;
    border: 1px solid #b3c211;
  }
  .mensaje-validacion-form{
    margin-top: -25px;
  }

  .mensaje-validacion-form small{
    font-size: 11px;
  }
  .btn-google{
      background-color: #dc4e41;
  }
  .btn-google:hover{
    background-color: #bb2416;
}
`]
})
export class RegisterComponent implements OnInit {

    forma: FormGroup;


    constructor(
        public _usuarioService: UsuarioService,
        public router: Router
    ) { }

    sonIguales(campo1: string, campo2: string) {

        return (group: FormGroup) => {

            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            if ( pass1 === pass2) {
                return null;
            }
            return {
                sonIguales: true,
            };
        };
    }

    ngOnInit() {
        iniciar_plugins();

        this.forma = new FormGroup({
            nombre: new FormControl(null, Validators.required ),
            apellidos: new FormControl(null, Validators.required ),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,

                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
            ], this.validateEmailNotTaken.bind(this) ),
            password: new FormControl(null, [Validators.required,  Validators.minLength(6), Validators.maxLength(30)]),
            password2: new FormControl(null, Validators.required),
            condiciones: new FormControl(false)
        }, { validators: [ this.sonIguales('password', 'password2')]}
        );
    }

    registrarUsuario() {

        const Toast = Swal.mixin({
            confirmButtonColor: '#b3c211',
        });
        // console.log(this.forma);
        if (this.forma.invalid) {
            Toast.fire('Error', 'Corrija los errores del formulario', 'error');
            return;
        }

        if (!this.forma.value.condiciones) {
            Toast.fire('Importante', 'Debe acepta las condiciones', 'warning');
            return;
        }

        const usuario = new Usuario(
            this.forma.value.nombre,
            this.forma.value.apellidos,
            this.forma.value.email,
            this.forma.value.password,
            false
        );

        this._usuarioService.crearUsuario(usuario)
        .subscribe(resp => this.router.navigate(['/conf_registro']));
    }


    validateEmailNotTaken(control: AbstractControl) {
        return this._usuarioService.checkEmailNotTaken(control.value)
            .pipe(
                map(res => {
                    return res ? null : { emailTaken: true };
                  })
            );
        }


}
