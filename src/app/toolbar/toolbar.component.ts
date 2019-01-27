import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  isAuthorized: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => this.updateAuthorizedState());
  }

  updateAuthorizedState() {
    this.isAuthorized = this.auth.isAuthorized();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
