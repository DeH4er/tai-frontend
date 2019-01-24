import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Dict} from '../models/Dict';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const dicts_url = environment.base_url + '/api/dicts';
const dict_url  = environment.base_url + '/api/dict';

const mockup: Dict[] = [
  {id: 1, words: ['asd', 'qwe', 'xzc']},
  {id: 2, words: ['123zxc', 'eqw', 'dsfds']},
  {id: 3, words: ['acxz', 'dsad3we', 'xaasdc']},
  {id: 4, words: ['knz', 'nbvl9', 'mdkj8']},
  {id: 5, words: ['hmob', 'asd23', 'bzasd=']}
];

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(
    private http: HttpClient
  ) { }

  getDict(): Observable<Dict> {
    return of(mockup[1]);
    return this.http.get<Dict>(dict_url);
  }
}
