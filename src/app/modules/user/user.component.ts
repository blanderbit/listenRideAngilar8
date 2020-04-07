import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@models/user/user';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { takeUntil } from 'rxjs/operators';
import { ApiUserService } from '@api/api-user/api-user.service';
import { ApiOauthService } from '@api/api-oauth/api-oauth.service';
import { ratingArray } from './helpers/helpers';
import isEmpty from 'lodash-es/isEmpty';

@Component({
  selector: 'lnr-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  defaultImageUrl: string =
    'https://s3.eu-central-1.amazonaws.com/listnride/assets/default_profile_picture.jpg';
  shopImageUrl: string = 'assets/images/icons/shared/lnr_shop_avatar.svg';

  userId: number;
  currentUserId: number;
  isAdmin: boolean = false;
  user$: Observable<boolean | User>;
  currentUser$ = this.storeAuth.pipe(select(fromAuth.selectUser));
  destroyed$ = new Subject();

  ratingArray = ratingArray;
  isEmpty = isEmpty;

  constructor(
    private apiUserService: ApiUserService,
    private apiOauthService: ApiOauthService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private storeAuth: Store<fromAuth.State>,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.userId = id;
    });
    this.user$ = this.route.params.pipe(
      switchMap(() => this.apiUserService.read(this.userId)),
      catchError(() => this.router.navigate(['404'])),
    );
    this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user) {
        this.currentUserId = user.id;
        this.isAdmin = user.me.admin;
      }
    });
  }

  pictureUrl(user: User): string {
    return user.hasBusiness && user.id !== this.currentUserId
      ? this.shopImageUrl
      : user.profilePicture.profilePicture.url || this.defaultImageUrl;
  }

  displayableName(user: User): string {
    return user.hasBusiness && user.id !== this.currentUserId
      ? this.translate.instant('shared.local-business')
      : user.firstName;
  }

  stealSession(userId: number): void {
    if (this.isAdmin) {
      let token$ = this.apiOauthService.getAccessTokenFor(userId);
      // token$.pipe(takeUntil(this.destroyed$)).subscribe(data => {});
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
