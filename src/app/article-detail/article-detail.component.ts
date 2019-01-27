import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../models/Article';
import {ArticleService} from '../services/article.service';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.sass']
})
export class ArticleDetailComponent implements OnInit {

  article: Article;
  isAuthor: boolean;
  paragraphs: string[];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const article_id = +this.route.snapshot.paramMap.get('id');
    this.getArticle(article_id);
  }

  getArticle(article_id: number) {
    this.articleService.getArticle(article_id).subscribe( article => {
      this.article = article;
      this.paragraphs = this.parseParagraphs(article.content);
      this.isArticleAuthor().subscribe(isAuthor => this.isAuthor = isAuthor);
    });
  }

  parseParagraphs(text: string) {
    return text.split('\n');
  }

  isArticleAuthor(): Observable<boolean> {
    return this.userService.getUser()
      .pipe(
        map(user => user.email === this.article.author.email)
      );
  }

  delete() {
    this.articleService.deleteArticle(this.article.id).subscribe( () => {
      this.router.navigate(['']);
    });
  }

}
