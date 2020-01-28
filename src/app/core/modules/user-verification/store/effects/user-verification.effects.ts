import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map, take} from 'rxjs/operators';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserVerificationActions, UserVerificationDialogActions} from '@core/modules/user-verification/store/actions';
import {UserVerificationDialogComponent} from '@core/modules/user-verification/user-verification-dialog/user-verification-dialog.component';
import {SignUpDialogActions} from '@auth/store/actions';
import {select, Store} from '@ngrx/store';
import * as fromUserVerification from '../reducers/index';

@Injectable()
export class UserVerificationEffects {

  userVerificationDialogOpen$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserVerificationActions.headerOpenUserVerificationDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig();
          const dialogRef = this.dialog.open(UserVerificationDialogComponent, dialogConfig);

          return of(dialogRef.id);
        }),
        map(dialogId => UserVerificationDialogActions.opened({dialogId}))
      );
    }
  );

  userVerificationDialogClose$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserVerificationDialogActions.close),
        exhaustMap(() => this.store.pipe(take(1), select(fromUserVerification.selectUserVerificationDialogState))),
        map((state) => {
          this.dialog.getDialogById(state.dialogId).close();
          return UserVerificationDialogActions.closed();
        })
      );
    }
  );

  constructor(private actions$: Actions,
              private dialog: MatDialog,
              private store: Store<fromUserVerification.State>) {
  }
}


