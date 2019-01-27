import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {ReadTime} from './pipes/ReadTime';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt-interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorSnackComponent} from './services/error.service';
import { LoaderComponent } from './loader/loader.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleFormComponent } from './article-form/article-form.component';

@NgModule({
  entryComponents: [
    ErrorSnackComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ReadTime,
    ToolbarComponent,
    ErrorSnackComponent,
    LoaderComponent,
    ArticlesComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    PaginatorComponent,
    ArticlePreviewComponent,
    ArticleFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
