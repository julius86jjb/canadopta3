import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
declare function iniciar_plugins();

@Component({
  selector: 'app-comfirmar-registro',
  templateUrl: './comfirmar-registro.component.html',
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
    p span a {
        color: #b3c211;
        font-weight: bold;
    }`
  ]
})
export class ComfirmarRegistroComponent implements OnInit {

    usuario: Usuario;

    constructor(
        public _usuarioService: UsuarioService
    ) { 
        this.usuario = _usuarioService.usuarioPendienteDeConfirmación;
    }

    ngOnInit() {
        iniciar_plugins();
    }

    reenviarEmail() {
        console.log('hola');
        this._usuarioService.reenviarEmail(this.usuario)
            .subscribe(resp => console.log(resp));
    }

    public modificarEmailyReenviar(email: string): void {

        this.usuario.email = email;
        


        this._usuarioService.modificarEmailyReenviar(this.usuario)
            .subscribe(resp => console.log(resp));
       
    }
    
    
}
