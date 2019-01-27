import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorService} from '../services/error.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class PasswordConfirmationMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  
  matcher = new PasswordConfirmationMatcher();

  registrationForm = this.fb.group
  ( { name: [ '', Validators.required]
    , email: [ '', Validators.compose([Validators.required, Validators.email])]
    , password_group: this.fb.group
      ( { password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        , password_confirmation: [ '', Validators.compose([Validators.required, Validators.minLength(6)]) ]
        }
        , { validators: this.checkPasswordConfirmation }
      )

  } );

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
  }

  checkPasswordConfirmation(group: FormGroup) {

    const password = group.get('password').value;
    const password_confirmation = group.get('password_confirmation').value;

    return password === password_confirmation ? null : {notSame: true};
  }

  register() {
    const {name, email, password_group} = this.registrationForm.value;
    const {password, password_confirmation} = password_group;
    const form = {name, email, password, password_confirmation};
    this.auth.register(form).subscribe(() => {
      this.router.navigate(['']);
    }, (err) => {
      this.errorService.snack('An error occured on registration! Probably this email is already registered in application');
    });
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password_group').get('password');
  }

  get password_confirmation() {
    return this.registrationForm.get('password_group').get('password_confirmation');
  }

  get password_group() {
    return this.registrationForm.get('password_group');
  }

}
