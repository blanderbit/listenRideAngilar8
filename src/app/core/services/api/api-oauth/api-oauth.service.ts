import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokensEnum } from '@enums/tokens.enum';
import { OauthRefreshRequest } from '@models/oauth/oauth-refresh-request';
import { map, share } from 'rxjs/operators';
import { OauthTokenRequest } from '@models/oauth/oauth-token-request';
import { OauthTokenResponse } from '@models/oauth/oauth-token-response';
import { OauthTokenFacebookRequest } from '@models/oauth/oauth-token-facebook-request';
import {
  AuthService,
  FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class ApiOauthService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  token(
    oauthTokenRequest: OauthTokenRequest | OauthTokenFacebookRequest,
  ): Observable<OauthTokenResponse> {
    return this.httpClient.post<OauthTokenResponse>(
      '/oauth/token',
      oauthTokenRequest,
    );
  }

  refresh(
    oauthRefreshRequest: OauthRefreshRequest,
  ): Observable<OauthTokenResponse> {
    return this.httpClient
      .post<OauthTokenResponse>('/oauth/refresh', oauthRefreshRequest)
      .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          localStorage.setItem(TokensEnum.ACCESS_TOKEN, res.access_token);
          localStorage.setItem(TokensEnum.REFRESH_TOKEN, res.refresh_token);
          localStorage.setItem(TokensEnum.TOKEN_TYPE, res.token_type);
          return res;
        }),
      );
  }

  fetchClientToken(id) {
    return this.httpClient
      .get(`/users/${id}/payment_methods/new`)
      .pipe(map(({ token }: any) => token))
      .toPromise();
  }

  savePaypalPaymentMethod(payload, userId) {
    const data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      payment_method: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payment_method_nonce: payload.nonce,
        email: payload.details.email,
        // eslint-disable-next-line @typescript-eslint/camelcase
        payment_type: 'paypal-account',
      },
    };
    return this.postCredit(data, userId, data.payment_method);
  }

  postCredit(data, userId, method) {
    return this.httpClient
      .post(`/users/${userId}/payment_methods`, data)
      .pipe(map(() => method))
      .toPromise();
  }

  postCreditCard(creditCardData, userId) {
    const data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      payment_method: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payment_type: 'credit-card',
        data: {
          ...creditCardData.paymentMethod,
          holderName: creditCardData.paymentMethod.holderName,
        },
      },
    };

    return this.postCredit(data, userId, data.payment_method);
  }

  fetchPaymentMethodNonce(userId) {
    return this.httpClient
      .get(`/users/${userId}/payment_methods/nonce`)
      .pipe(map(({ data }: any) => data))
      .toPromise();
  }

  loginFacebook(): Observable<SocialUser> {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    return this.authService.authState;
  }
}
