import { Component, OnInit } from '@angular/core';
import {Article} from '../models/Article';
import {ArticleService} from '../services/article.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.sass']
})
export class ArticleCreateComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  createArticle(article: Article) {
    this.articleService.createArticle(article).subscribe( article => {
      this.route.navigate([`/article/${article.id}`]);
    });
  };

  cancelCreate() {
    this.route.navigate(['/articles']);
  }

}
