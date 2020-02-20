import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {first, tap} from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(
        private store: Store<fromAuth.State>
    ) {}

    resolve() {
        return this.store.pipe(
            select(fromAuth.selectAuthGetUser),
            tap(loaded => loaded),
            first()
        );
    }
}
