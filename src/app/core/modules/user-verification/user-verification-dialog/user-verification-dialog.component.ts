import {Component} from '@angular/core';
import {UserVerificationDialogActions} from '@core/modules/user-verification/store/actions';
import {Store} from '@ngrx/store';
import * as fromUserVerification from '../store/reducers';

@Component({
  selector: 'lnr-user-verification-dialog',
  templateUrl: './user-verification-dialog.component.html',
  styleUrls: ['./user-verification-dialog.component.scss']
})

export class UserVerificationDialogComponent {

  constructor(private store: Store<fromUserVerification.State>) {
  }

  close() {
    this.store.dispatch(UserVerificationDialogActions.close());
  }
}
