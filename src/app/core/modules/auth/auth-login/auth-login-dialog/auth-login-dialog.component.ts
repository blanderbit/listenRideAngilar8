import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';
import {ValidatorsLnr} from '@validators/validators-lnr';
import {Store} from '@ngrx/store';
import {User} from '@models/user/user';
import {AuthActions} from '@core/modules/auth/store/actions';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';

@Component({
  selector: 'lnr-auth-login-dialog',
  templateUrl: './auth-login-dialog.component.html',
  styleUrls: ['./auth-login-dialog.component.scss']
})
export class AuthLoginDialogComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  form: FormGroup;
  loading = false;
  error: HttpErrorResponse;

  constructor(private dialogRef: MatDialogRef<AuthLoginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private fb: FormBuilder,
              private apiOauthService: ApiOauthService,
              private store: Store<OauthTokenResponse>
  ) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const oauthTokenRequest: OauthTokenRequest = {
      ...this.form.value,
    };

    this.apiOauthService.token(oauthTokenRequest)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((tokens) => {
        this.store.dispatch(AuthActions.SaveTokens({tokens}));
        this.loading = false;
        this.onClose();
      }, (error) => {
        this.loading = false;
        this.error = error;
      });

  }

  private getForm() {
    const formControls = {
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      grant_type: [OauthGrantTypeEnum.PASSWORD, Validators.required],
    };

    return this.fb.group({
      ...formControls
    });
  }
}
