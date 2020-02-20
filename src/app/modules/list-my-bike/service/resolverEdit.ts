import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {catchError, map} from 'rxjs/operators';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {EMPTY} from 'rxjs';

@Injectable()
export class UserEditDataResolver implements Resolve<any> {
    constructor(
        private store: Store<fromAuth.State>,
        private activateRoute: ActivatedRoute,
        private apiRidesService: ApiRidesService,
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.apiRidesService.getById(route.params.id,false)
            .pipe(
                map((data: any) => data && data.current),
                catchError(()   => EMPTY)
            );
    }
}
