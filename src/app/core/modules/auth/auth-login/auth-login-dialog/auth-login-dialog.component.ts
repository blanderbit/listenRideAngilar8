import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lnr-auth-login-dialog',
  templateUrl: './auth-login-dialog.component.html',
  styleUrls: ['./auth-login-dialog.component.scss']
})
export class AuthLoginDialogComponent {
  login$ = new Subject<boolean>();

  form: FormGroup;
  invalid = true;
  error: HttpErrorResponse;
  pending = false;

  constructor(public dialogRef: MatDialogRef<AuthLoginDialogComponent>) {
  }

  onValueValid() {
    this.invalid = false;
  }

  onValueInvalid() {
    this.invalid = true;
  }

  onLoginPending() {
    this.pending = true;
  }

  onLoginSuccess() {
    this.pending = false;
    this.close();
  }

  onLoginError(error: HttpErrorResponse) {
    this.pending = false;
    this.error = error;
  }

  login() {
    this.login$.next(true);
  }

  close() {
    this.dialogRef.close();
  }

}
