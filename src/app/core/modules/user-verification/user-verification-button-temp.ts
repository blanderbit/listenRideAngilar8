import {Component, Input, OnInit} from '@angular/core';
import {AuthActions} from '@core/modules/auth/store/actions';
import {Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {UserVerificationActions} from '@core/modules/user-verification/store/actions';

@Component({
  selector: 'lnr-user-verification-button-temp',
  template: `
    <button mat-flat-button
            class="lnr-w-100"
            (click)="openDialog()"
            [disabled]="disabled"
    >{{text}}</button>`,
})
export class UserVerificationButtonTempComponent implements OnInit {
  @Input() text = 'Verify profile';
  @Input() disabled = false;

  constructor(private store: Store<fromAuth.State>) {
  }

  ngOnInit() {
    // this.openDialog();
  }

  openDialog(): void {
    this.store.dispatch(UserVerificationActions.headerOpenUserVerificationDialog());
  }

}
