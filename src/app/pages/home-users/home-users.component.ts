import { Component, OnInit } from '@angular/core';
declare function iniciar_plugins();

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html',
  styleUrls: ['./home-users.component.css']
})
export class HomeUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciar_plugins();
  }

}
