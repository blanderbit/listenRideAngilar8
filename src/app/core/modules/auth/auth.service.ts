// TODO Fix to avoid eslint-disable (see below in file). This file is invalid!
import { Injectable } from '@angular/core';
import { OauthTokenRequest } from '@models/oauth/oauth-token-request';
import { OauthTokenFacebookRequest } from '@models/oauth/oauth-token-facebook-request';
import { ApiOauthService } from '@api/api-oauth/api-oauth.service';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { TokensEnum } from '@enums/tokens.enum';
import { OauthTokenResponse } from '@models/oauth/oauth-token-response';
import { Observable, of } from 'rxjs';
import { User } from '@models/user/user';
import { ApiUserService } from '@api/api-user/api-user.service';
import { AuthActions } from '@auth/store/actions';
import { SignUpRequest } from '@models/sign-up/sign-up-request';
import { SignUpFacebookRequest } from '@models/sign-up/sign-up-facebook-request';
import { OauthGrantTypeEnum } from '@enums/oauth-grant-type.enum';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { ApiBusinessService } from '@api/api-business/api-business.service';
import { BusinessCreateRequest } from '@models/business/business-create-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private apiOauthService: ApiOauthService,
    private apiUserService: ApiUserService,
    private apiBusinessService: ApiBusinessService,
    private store: Store<fromAuth.State>,
  ) {}

  signUp(signUpRequest: SignUpRequest, companyName = null): Observable<User> {
    return this.apiUserService.create(signUpRequest).pipe(
      exhaustMap(user => {
        const oauthTokenRequest: OauthTokenRequest = {
          email: signUpRequest.user.email,
          password: signUpRequest.user.password,
          // eslint-disable-next-line @typescript-eslint/camelcase
          grant_type: OauthGrantTypeEnum.PASSWORD,
        };
        return this.getUser(oauthTokenRequest, companyName);
      }),
    );
  }

  signUpFB(
    signUpFacebookRequest: SignUpFacebookRequest,
    companyName = null,
  ): Observable<User> {
    return this.apiUserService.create(signUpFacebookRequest).pipe(
      exhaustMap(user => {
        const oauthTokenFacebookRequest: OauthTokenFacebookRequest = {
          assertion: signUpFacebookRequest.user.facebook_access_token,
          // eslint-disable-next-line @typescript-eslint/camelcase
          grant_type: OauthGrantTypeEnum.ASSERTION,
        };
        return this.getUser(oauthTokenFacebookRequest, companyName);
      }),
    );
  }

  getUser(
    oauthTokenRequest: OauthTokenRequest | OauthTokenFacebookRequest,
    companyName = null,
  ): Observable<User> {
    return this.apiOauthService.token(oauthTokenRequest).pipe(
      tap(oauthTokenResponse => this.saveTokens(oauthTokenResponse)),
      exhaustMap(() => this.apiUserService.me()),
      exhaustMap((me: Partial<User>) => this.apiUserService.read(me.id)),
      exhaustMap((user: User) => {
        this.store.dispatch(AuthActions.updateUser({ user }));
        if (companyName) {
          const businessCreateRequest: BusinessCreateRequest = {
            business: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              company_name: companyName,
            },
          };

          return this.apiBusinessService.create(businessCreateRequest).pipe(
            map(() => {
              this.store.dispatch(AuthActions.updateUserByApi());
              return user;
            }),
          );
        }
        return of(user);
      }),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  saveTokens(oauthTokenResponse: OauthTokenResponse) {
    localStorage.setItem(
      TokensEnum.ACCESS_TOKEN,
      oauthTokenResponse.access_token,
    );
    localStorage.setItem(
      TokensEnum.REFRESH_TOKEN,
      oauthTokenResponse.refresh_token,
    );
    localStorage.setItem(TokensEnum.TOKEN_TYPE, oauthTokenResponse.token_type);
  }
}
