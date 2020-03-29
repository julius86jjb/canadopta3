import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    SettingsService,
    SharedService,
    NavbarService,
    UsuarioService,
    LoginService,
    LoginGuardGuard,
    CentroService
} from './service.index';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    NavbarService,
    UsuarioService,
    LoginService,
    LoginGuardGuard,
    CentroService
    
  ]
})
export class ServiceModule { }
