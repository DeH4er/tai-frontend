import {Injectable, Component, Inject} from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  template: '{{data}}'
})
export class ErrorSnackComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  snack(message: string) {
    this.snackBar.openFromComponent(ErrorSnackComponent, {data: message, duration: 3000});
  }

}
