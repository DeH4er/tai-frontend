import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TrainerComponent } from './trainer/trainer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StatsComponent } from './stats/stats.component';
import { MaterialModule } from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {TransformIfNotLetter} from './pipes/TransformIfNotLetter';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt-interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorSnackComponent} from './services/error.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  entryComponents: [
    ErrorSnackComponent
  ],
  declarations: [
    AppComponent,
    TrainerComponent,
    LoginComponent,
    RegistrationComponent,
    StatsComponent,
    TransformIfNotLetter,
    ToolbarComponent,
    ErrorSnackComponent,
    LoaderComponent
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
