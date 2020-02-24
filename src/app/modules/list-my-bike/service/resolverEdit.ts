import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {catchError, first, map, switchMap, tap} from 'rxjs/operators';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {EMPTY} from 'rxjs';
import {AuthActions} from '@auth/store/actions';

@Injectable()
export class UserEditDataResolver implements Resolve<any> {
    constructor(
        private store: Store<fromAuth.State>,
        private activateRoute: ActivatedRoute,
        private apiRidesService: ApiRidesService,
        private router: Router,
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        let user;
        return this.store.pipe(
            select(fromAuth.selectAuthGetUser),
            tap(loaded => user = loaded),
            first(),
            switchMap(() => this.apiRidesService.getById(route.params.id, false)),
            map((data: any) => data && data.current),
            catchError(() => this.router.navigate(['/'])),
            tap(item => {
                if (!user || (user && !user.id)) {
                    this.store.dispatch(AuthActions.headerOpenLoginDialog());
                    return this.router.navigate(['/']);
                }
                if (!item || (user.id !== (item && item.user && item.user.id))) {
                    return this.router.navigate(['/**']);
                }
            })
        );
    }
}
