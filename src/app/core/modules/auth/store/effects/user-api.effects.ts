import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {AuthActions, UserApiActions} from '@core/modules/auth/store/actions';
import {LocalStorageKeysEnum} from '@enums/local-storage-keys.enum';

@Injectable()
export class UserApiEffects {

  getMeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.getMeSuccess),
        map(({me}) => {
          return AuthActions.saveMeSuccess({me});
        })
      );
    }
  );

  getUserByIdSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.getUserByIdSuccess),
        map(({user}) => {
          return AuthActions.saveUserSuccess({user});
        })
      );
    }
  );

  constructor(private actions$: Actions) {

  }

}
