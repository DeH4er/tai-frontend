import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import 
  { HttpInterceptor
  , HttpRequest
  , HttpEvent
  , HttpHandler
  } from '@angular/common/http';

import {Observable} from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    }

    req = req.clone({headers: req.headers.set('Accept', 'application/json')});

    return next.handle(req)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {console.log(event)},
          (err: any) => {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/login']);
              }
            }
          }
        )
      );
  }

}
