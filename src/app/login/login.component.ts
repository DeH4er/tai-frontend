import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private errorService: ErrorService,
    private router: Router
  ) {
  }

  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  login() {
    this.auth.login(this.loginForm.value)
      .subscribe(
        () => this.router.navigate(['']),
        (err: any) => {
          console.log('error');
          this.errorService.snack("Couldn't login! Please check your password or email!");
        }
      );
  }

  ngOnInit() {
  }

}
