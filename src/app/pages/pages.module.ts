import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdopcionesComponent } from './adopciones/adopciones.component';
import { HomeComponent } from './home/home.component';
import { CentrosComponent } from './centros/centros.component';
import { PagesComponent } from './pages.component';

import { ColaboraComponent } from './colabora/colabora.component';
import { ContactoComponent } from './contacto/contacto.component';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PipesModule } from '../pipes/pipes.module';
import { HomeUsersComponent } from './home-users/home-users.component';


@NgModule({
    declarations: [
        HomeComponent,
        AdopcionesComponent,
        CentrosComponent,
        PagesComponent,
        ColaboraComponent,
        ContactoComponent,
        HomeUsersComponent,
    ],
    exports: [
        HomeComponent,
        AdopcionesComponent,
        CentrosComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        SweetAlert2Module,
        PipesModule
    ]
})

export class PagesModule {}

