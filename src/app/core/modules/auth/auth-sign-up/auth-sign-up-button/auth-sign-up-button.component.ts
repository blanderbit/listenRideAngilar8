import {Component, Input, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {AuthSignUpDialogComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import {DialogConfig} from '@core/configs/dialog/dialog.config';

@Component({
  selector: 'lnr-auth-sign-up-button',
  templateUrl: './auth-sign-up-button.component.html',
  styleUrls: ['../../shared/button.scss', './auth-sign-up-button.component.scss']
})
export class AuthSignUpButtonComponent implements OnDestroy {
  private destroyed$ = new Subject();
  @Input() text = 'Sign up';
  @Input() disabled = false;

  constructor(private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openDialog(): void {
    const dialogConfig = new DialogConfig();

    this.dialog.open(AuthSignUpDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
      });
  }

}
