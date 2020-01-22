import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {select, Store} from '@ngrx/store';
import {isLoggedIn} from '@core/modules/auth/store/auth.selectors';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';

@Component({
  selector: 'lnr-auth-login-button',
  templateUrl: './auth-login-button.component.html',
  styleUrls: ['../../shared/button.scss', './auth-login-button.component.scss']
})
export class AuthLoginButtonComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  @Input() text = 'Login';
  @Input() disabled = false;
  isLoggedIn: boolean;

  constructor(
    private dialog: MatDialog,
    private store: Store<OauthTokenResponse>) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(isLoggedIn)
      )
      .subscribe(value => this.isLoggedIn = value);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openDialog(): void {
    const dialogConfig = new DialogConfig('400px');

    this.dialog.open(AuthLoginDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
      });
  }

}
