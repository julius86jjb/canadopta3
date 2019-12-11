import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
declare function iniciar_plugins();

@Component({
  selector: 'app-conf-reenvio',
  templateUrl: './conf-reenvio.component.html',
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
  }`]
})
export class ConfReenvioComponent implements OnInit {

    cargando: boolean = false;
    usuario: Usuario;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public _usuarioService: UsuarioService
    ) { 
        activatedRoute.params.subscribe(params => {
            const user_id = params['user_id'];
    
            if (user_id !== null) {
                this.reenviarEmail(user_id);
            }
            
        });
    }

    ngOnInit() {
        iniciar_plugins();

    }

    reenviarEmail(user_id) {
        this.cargando = true
         this._usuarioService.reenviarEmail(user_id)
            .subscribe((resp) => {
                
                this.usuario = resp.usuario;
                this.cargando = false;
            });
    }

    modificarEmailyReenviar(email: string) {

        this.cargando = true;
        this.usuario.email = email;

        this._usuarioService.modificarEmailyReenviar(this.usuario)
            .subscribe(resp => {
                this.usuario = resp.usuario;
                this.cargando = false;
                
            });
       
    }

}
