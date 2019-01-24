import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/User';
import {map, tap} from 'rxjs/operators';

const user_url = environment.base_url + '/api/user';
const stats_url = environment.base_url + '/api/stats';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(
    private http: HttpClient
  ) { }

  pushStats(stats: any) {
    return this.http.post(stats_url, stats);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(user_url);
  }

  doesUserLoaded(): boolean {
    return !!this.user;
  }

  getUserField(field: string): Observable<any> {
    if (this.doesUserLoaded()) {
      return of(this.user[field]);
    }

    return this.getUser().pipe(tap(user => this.user = user), map(user => user[field]));
  }
}
