import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../services/article.service';
import {Article} from '../models/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  total: number;

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.getArticles(1, 5);
  }

  getArticles(page: number, per_page: number) {
    this.articleService.getArticles(page, per_page).subscribe( paginatedArticles => {
      this.articles = paginatedArticles.data;
      this.total = paginatedArticles.total;
    });
  }

  paginatorEvent({page, per_page}) {
    this.getArticles(page, per_page);
  }

}
