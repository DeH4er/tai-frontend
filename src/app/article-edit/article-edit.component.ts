import { Component, OnInit } from '@angular/core';
import {Article} from '../models/Article';
import {ArticleService} from '../services/article.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.sass']
})
export class ArticleEditComponent implements OnInit {

  article: Article;
  article_id: number;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.article_id = +this.route.snapshot.paramMap.get('id');
    this.getArticle(this.article_id);
  }

  getArticle(article_id: number) {
    this.articleService.getArticle(article_id).subscribe(article => this.article = article);
  }

  editArticle(article: Article) {
    article.id = this.article_id;
    this.articleService.updateArticle(article).subscribe(article => {
      this.router.navigate([`/article/${article.id}`]);
    });
  }

  cancelEdit() {
    this.router.navigate([`/article/${this.article.id}`]);
  }

}
