import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    usuario: Usuario;
    token: string;
    reenvio: boolean;

    constructor(
        public http: HttpClient,
        private router: Router,
    ) {
        this.cargarStorage(); 
    }

    cargarStorage() {
        if ( localStorage.getItem('token')) {
            this.token =  localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            // this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            // this.menu = [];
        }

    }

    guardarStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        // localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        // this.menu = menu;
        // console.log(this.usuario);

    }

    logout() {
        this.usuario = null;
        this.token = '';

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);
    }

    login(usuario: Usuario, recordar: boolean = false) {
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }
        const url = URL_SERVICIOS + '/login';
        return this.http.post(url, usuario)
        .pipe(
            map( (resp: any) => {

                this.guardarStorage(resp.id, resp.token, resp.usuario);
                return true;
            }),
            catchError(err => {
                
                if (err) {
                       
                        
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al iniciar sesión',
                        text: err.error.mensaje,
                        confirmButtonText:'Aceptar',
                        confirmButtonColor: '#b3c211'
                    })
                    return throwError(err);
                }
                
            })
        );
    }


    loginGoogle(token: string) {
        const url = URL_SERVICIOS + '/login/google';
        return this.http.post(url, {token: token})
        .pipe(
            map((resp: any) => {

                // this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                // console.log(resp);
                return true;
            }),
            catchError(err => {

                if (err.status === 455) {
                        
                    Swal.fire({
                        icon: 'error',
                        title: 'Error - Inicie sesión sin google',
                        text: 'Ya existe una cuenta asociada a esa dirección de email, inicie sesión sin google',
                        confirmButtonText:'Aceptar',
                        confirmButtonColor: '#b3c211'
                    })
                    return throwError(err);
                }

                if (err) {
                       
                        
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.error.mensaje,
                        confirmButtonText:'Aceptar',
                        confirmButtonColor: '#b3c211'
                    })
                    return throwError(err);
                }
                
            })
        );
    }

    estaLogueado() {
        return ( this.token.length > 5) ? true : false;
    }
}
