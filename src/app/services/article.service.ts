import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Article} from '../models/Article';
import {PaginatedResponse} from '../models/PaginatedResponse';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const articles_url = environment.base_url + '/api/articles';
const article_url = environment.base_url + '/api/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(page: number, per_page: number): Observable<PaginatedResponse<Article>> {
    return this.http.get<PaginatedResponse<Article>>(`${articles_url}?page=${page}&per_page=${per_page}`);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${article_url}/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${articles_url}/`, article);
  }

  updateArticle(article: Article): Observable<any> {
    return this.http.put<any>(`${article_url}/${article.id}`, article);
  }

  deleteArticle(article_id: number): Observable<any> {
    return this.http.delete(`${article_url}/${article_id}`);
  }
}
