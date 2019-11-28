import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/service.index';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    titulo: string;

    constructor(public _navBar: NavbarService,
                    private router: Router,
                    private title: Title,
                    private meta: Meta) {
    this.getTituloRuta()
        .subscribe( data => {
            // console.log(event);
            this.titulo = data.titulo;
            this.title.setTitle( this.titulo);


            const metaTag: MetaDefinition = {
                name: 'description',
                content: this.titulo
            };
            this.meta.updateTag(metaTag);
        });
    }

    ngOnInit() {
    }

    getTituloRuta() {
    return this.router.events
    .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data  )
    );

    }

}
