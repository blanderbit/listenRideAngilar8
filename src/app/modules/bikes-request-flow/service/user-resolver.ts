import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {catchError, first, tap} from 'rxjs/operators';
import {AuthActions} from '@auth/store/actions';

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(
        private store: Store<fromAuth.State>,
        private router: Router,
    ) {}

    resolve() {
        return this.store.pipe(
            select(fromAuth.selectUser),
            tap(loaded => loaded),
            first()
        );
    }
}
