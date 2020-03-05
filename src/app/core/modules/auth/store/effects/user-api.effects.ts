import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map} from 'rxjs/operators';
import {AuthActions, UserApiActions} from '@core/modules/auth/store/actions';
import {concat, of} from 'rxjs';
import {LocalStorageKeysEnum} from '@enums/local-storage-keys.enum';

@Injectable()
export class UserApiEffects {

  getMeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.getMeSuccess),
        map(({me}) => {
          try {
            localStorage.setItem(LocalStorageKeysEnum.ME, JSON.stringify(me));
            return AuthActions.saveMeSuccess({me});
          } catch (exception) {
            return AuthActions.saveMeError({exception});
          }
        })
      );
    }
  );

  getUserByIdSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.getUserByIdSuccess),
        map(({user}) => {
          try {
            localStorage.setItem(LocalStorageKeysEnum.USER, JSON.stringify(user));
            return AuthActions.saveUserSuccess({user});
          } catch (exception) {
            return AuthActions.saveUserError({exception});
          }
        })
      );
    }
  );

  constructor(private actions$: Actions) {

  }

}
