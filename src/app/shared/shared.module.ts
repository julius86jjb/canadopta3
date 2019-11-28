import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { BigfooterComponent } from './bigfooter/bigfooter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SweetAlert2Module
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        NavbarComponent,
        BigfooterComponent,
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        NavbarComponent,
        BigfooterComponent,
    ]
})


export class SharedModule {}

