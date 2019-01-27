import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../models/Article';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.sass']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }

}
