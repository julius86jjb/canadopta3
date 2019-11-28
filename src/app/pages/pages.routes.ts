import { Routes, RouterModule } from '@angular/router';

import { AdopcionesComponent } from './adopciones/adopciones.component';
import { CentrosComponent } from './centros/centros.component';
import { ColaboraComponent } from './colabora/colabora.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent, data : {titulo: 'CanAdopta - Inicio'}  },
            { path: 'adopciones', component: AdopcionesComponent, data : {titulo: 'CanAdopta - Adopciones'}  },
            { path: 'centros', component: CentrosComponent, data : {titulo: 'CanAdopta - Centros de Adopción'}  },
            { path: 'colabora', component: ColaboraComponent, data : {titulo: 'CanAdopta - Colabora'}  },
            { path: 'contacto', component: ContactoComponent, data : {titulo: 'CanAdopta - Contacto'}  },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( PagesRoutes );
