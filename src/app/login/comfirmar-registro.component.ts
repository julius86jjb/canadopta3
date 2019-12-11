import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    cargando: boolean = false;
    reenvio: boolean = false;

    constructor(
        public _usuarioService: UsuarioService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
    ) { 
        this.usuario = this._usuarioService.usuario;
        activatedRoute.params.subscribe(params => {
            const user_id = params['user_id'];
            console.log(user_id);
            if (user_id ) {
                this.reenviarEmail(user_id);
            }
            
        });
        
    }

    ngOnInit() {
        iniciar_plugins();
        console.log(this._usuarioService.reenvio);
        this.reenvio = this._usuarioService.reenvio;
        
    }

    reenviarEmail(user_id) {
        this.cargando = true;
        this.reenvio =  true;
        this._usuarioService.reenviarEmail(user_id)
            .subscribe((resp) => {
                console.log(resp);
                this.usuario = resp.usuario;
                this.cargando = false;
            });
    }

    public modificarEmailyReenviar(email: string) {

        this.cargando = true;
        this.usuario.email = email;
        this.reenvio = true;

        this._usuarioService.modificarEmailyReenviar(this.usuario)
            .subscribe(resp => {
                
                this.usuario = resp.usuario;
                this.cargando = false;
            });
       
    }
    
    
}
