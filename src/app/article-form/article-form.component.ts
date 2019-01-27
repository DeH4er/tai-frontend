import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Article} from '../models/Article';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass']
})
export class ArticleFormComponent implements OnInit {
  
  @Input() article: Article;
  @Output() onArticleSubmit = new EventEmitter<Article>();
  @Output() onArticleCancel = new EventEmitter();

  articleForm = this.fb.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
    content: ['', Validators.compose([Validators.required, Validators.minLength(255), Validators.maxLength(99999)])]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.article) {
      this.title.setValue(this.article.title);
      this.description.setValue(this.article.description);
      this.content.setValue(this.article.content);
    }
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.onArticleSubmit.emit(this.articleForm.value);
    }
  }

  onCancel() {
    this.onArticleCancel.emit();
  }

  get title() {
    return this.articleForm.get('title');
  }

  get description() {
    return this.articleForm.get('description');
  }

  get content() {
    return this.articleForm.get('content');
  }

}
