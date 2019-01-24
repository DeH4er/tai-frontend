import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrainerComponent} from './trainer/trainer.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {StatsComponent} from './stats/stats.component';

const routes: Routes = [
  {path: '', component: TrainerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'stats', component: StatsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
