import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {Subject} from 'rxjs';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';
import {select, Store} from '@ngrx/store';
import {LoginDialogActions} from '@core/modules/auth/store/actions';
import * as fromAuth from '../../store/reducers';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'lnr-auth-login-dialog',
  templateUrl: './auth-login-dialog.component.html',
  styleUrls: ['./auth-login-dialog.component.scss']
})
export class AuthLoginDialogComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  form: FormGroup;
  pending$ = this.store.pipe(select(fromAuth.selectLoginDialogPending));
  error$ = this.store.pipe(select(fromAuth.selectLoginDialogError));

  constructor(private fb: FormBuilder,
              private apiOauthService: ApiOauthService,
              private store: Store<fromAuth.State>) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
    this.pending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const oauthTokenRequest: OauthTokenRequest = {...this.form.value};
    this.store.dispatch(LoginDialogActions.login({credentials: oauthTokenRequest}));
  }

  close() {
    this.store.dispatch(LoginDialogActions.close());
  }

  private getForm() {
    const formControls = {
      email: ['vasiliy.stukalo9+16@gmail.com', [Validators.required]],
      password: ['OTAcsf-1zMM', Validators.required],
      grant_type: [OauthGrantTypeEnum.PASSWORD],
    };

    return this.fb.group({
      ...formControls
    });
  }
}
