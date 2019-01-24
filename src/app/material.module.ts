import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 
  { MatButtonModule
  , MatToolbarModule
  , MatInputModule
  , MatSnackBarModule
  , MatProgressSpinnerModule
  } from '@angular/material';

const matComponents = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: matComponents,
  exports: matComponents
})
export class MaterialModule { }
