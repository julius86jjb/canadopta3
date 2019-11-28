import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { PreviousRegisterComponent } from './login/previous-register.component';
import { ComfirmarRegistroComponent } from './login/comfirmar-registro.component';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'prev_registro', component: PreviousRegisterComponent },
    { path: 'conf_registro', component: ComfirmarRegistroComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent  },
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});
