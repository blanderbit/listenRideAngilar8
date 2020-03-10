import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {exhaustMap, first} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User} from '@models/user/user';
import {ApiUserService} from '@api/api-user/api-user.service';

@Injectable()
export class UsersResolver implements Resolve<any> {
  constructor(
    private store: Store<fromAuth.State>,
    private apiUserService: ApiUserService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | User> {
    const userId = route.params.id;
    return this.store.pipe(
      select(fromAuth.selectUser),
      exhaustMap((user) => {
        if (+userId === +user.id) {
          return of(user);
        } else {
          return this.apiUserService.read(userId);
        }
      }),
      first()
    );
  }
}
