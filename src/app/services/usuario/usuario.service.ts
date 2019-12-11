import { Injectable, NgZone } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
// import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    reenvio: boolean;

  constructor(
      public http: HttpClient,
      private router: Router,
      private zone: NgZone
  ) {
   }



    crearUsuario(usuario: Usuario) {

        const url = URL_SERVICIOS + '/usuario';

        return this.http.post(url, usuario)
            .pipe(
                map( (resp: any) =>{
                    this.reenvio = false;
                    this.usuario =  resp.usuario;
                    return resp.usuario
                }),
                catchError(err => {
                    if (err) {
                       
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al registrar el usuario',
                            text: err.error.mensaje,
                            confirmButtonText:'Aceptar',
                            confirmButtonColor: '#b3c211'
                        })
                        return throwError(err);
                    }
                })
            );
    }

    checkEmailNotTaken(email: string) {
        const url = URL_SERVICIOS + '/usuario/verificaEmailDisponible/' + email;
        return this.http.get(url)
            .pipe(
                map((resp: any) =>  resp.total <= 0)
            );
    }

    reenviarEmail(user_id: string) {
        
        const url = URL_SERVICIOS + '/usuario/reenviar_email/' + user_id;
        
        return this.http.get(url)
            .pipe(
                map( (resp: any) => {
                    this.reenvio = true;
                    this.usuario = resp.usuario;
                    return resp;
                    
                   
                }),
                catchError(err => {
                    if (err.status === 409) {
                       
                        
                        this.router.navigate(['/login']);
                        Swal.fire({
                            icon: 'success',
                            title: 'Inicie Sesión',
                            text: err.error.mensaje,
                            confirmButtonText:'Iniciar Sesión',
                            confirmButtonColor: '#b3c211'
                        })
                        return throwError(err);
                    }
                })
            );
    }

    modificarEmailyReenviar(usuario: Usuario) {


        const url = URL_SERVICIOS + '/usuario/modificarEmailreenviar/' + usuario._id;
        
        return this.http.put(url,usuario)
            .pipe(
                map( (resp: any) => {

                    this.usuario = resp.usuario;
                    return resp;
                }),
                catchError(err => {
                    if (err.status === 409) {
                       
                        

                        this.router.navigate(['/login']);
                        Swal.fire({
                            icon: 'success',
                            title: 'Su cuenta ya fue activada anteriormente',
                            text: err.error.mensaje,
                            confirmButtonText:'Aceptar',
                            confirmButtonColor: '#b3c211'
                        })
                        return throwError(err);
                    }

                    if(err) {
                        

                        this.router.navigate(['/login']);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al reenviar el email',
                            text: err.error.mensaje,
                            confirmButtonText:'Aceptar',
                            confirmButtonColor: '#b3c211'
                        })
                        return throwError(err);
                    }
                })
            );
    }


    confirmarEmail(user_id: string) {
        const url = URL_SERVICIOS + '/usuario/confirmarEmail/' + user_id;

        return this.http.get(url)
        .pipe(
            map( (resp: any) => {
                this.router.navigate(['/login']);
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta Activada',
                    text: 'Su cuenta ha sido activada, ahora ya puede iniciar sesión',
                    confirmButtonText:'Aceptar',
                    confirmButtonColor: '#b3c211'
                })
                this.usuario = resp.usuario;
                return resp;
            }),
            catchError(err => {
                if(err.status === 414) {
                    
                    this.router.navigate(['/login']);
                    Swal.fire({
                        title: 'Error al activar su cuenta',
                        text: err.error.mensaje,
                        icon: 'warning',
                        confirmButtonColor: '#b3c211',
                        confirmButtonText: 'Reenviar email de activación'
                    })
                    .then((reenviar) => {
                        if (reenviar) {
                            this.reenvio = true;
                            this.router.navigate(['/conf_registro/' + err.error.user_id ])
                        } 
                    });
                    return throwError(err);
                }
                if(err) {
                    

                    this.router.navigate(['/login']);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al activar su cuenta',
                        text: err.error.mensaje,
                        confirmButtonText:'Aceptar',
                        confirmButtonColor: '#b3c211'
                    })
                    return throwError(err);
                }
            })
        );
    }


}
