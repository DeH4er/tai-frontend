import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleEditComponent} from './article-edit/article-edit.component';
import {ArticleCreateComponent} from './article-create/article-create.component';

const routes: Routes = [
  {path: '', redirectTo: 'articles', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'article/:id', component: ArticleDetailComponent},
  {path: 'article/:id/edit', component: ArticleEditComponent},
  {path: 'create', component: ArticleCreateComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
