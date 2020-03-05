import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {BusinessApiActions, SignUpDialogActions} from '@core/modules/auth/store/actions';

@Injectable()
export class BusinessApiEffects {

  signUpBusinessCreateSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BusinessApiActions.createSuccess),
        map(({business}) => {
          return SignUpDialogActions.close();
        })
      );
    }
  );

  constructor(private actions$: Actions) {

  }

}
