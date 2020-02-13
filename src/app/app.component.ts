import {Component, OnInit, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map, takeUntil} from 'rxjs/operators';
import * as fromAuth from './core/modules/auth/store/reducers';
import {Subject} from 'rxjs';
import {UserApiActions} from '@auth/store/actions';

@Component({
    selector: 'lnr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'listnride-frontend-new';
    private destroyed$ = new Subject();

    constructor(
        private store: Store<fromAuth.State>
    ) {
    }

    ngOnInit() {
        this.store.pipe(
            select(fromAuth.selectAuthGetUserCombine),
            takeUntil(this.destroyed$),
            map(([me, user]) => [
                    (me || this.lS_Select('ME')),
                    (user || this.lS_Select('USER'))
                ]
            )
        )
            .subscribe(
                ([
                     me,
                     user
                 ]) => {
                    if (me && user) {
                        this.store.dispatch(UserApiActions.UserDataInitialize({me, user}));
                        this.destroyed();
                    }
                },
                (e) => console.log(e)
            );
    }

    private lS_Select(type) {
        try {
            return JSON.parse(localStorage.getItem(type));
        } catch (e) {
            return false;
        }
    }

    ngOnDestroy(): void {
        this.destroyed();
    }

    destroyed(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
