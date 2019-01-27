import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const login_url = environment.base_url + '/api/login';
const registration_url = environment.base_url + '/api/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginForm): Observable<any> {
    return this.http.post(login_url, loginForm)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  register(registrationForm) {
    return this.http.post(registration_url, registrationForm)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        })
      );
  } 

  isAuthorized() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
