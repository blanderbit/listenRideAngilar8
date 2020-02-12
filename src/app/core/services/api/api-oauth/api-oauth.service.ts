import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokensEnum} from '@enums/tokens.enum';
import {OauthRefreshRequest} from '@models/oauth/oauth-refresh-request';
import {map, share} from 'rxjs/operators';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';
import {OauthTokenFacebookRequest} from '@models/oauth/oauth-token-facebook-request';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';

@Injectable({providedIn: 'root'})
export class ApiOauthService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
  }

  token(oauthTokenRequest: OauthTokenRequest | OauthTokenFacebookRequest): Observable<OauthTokenResponse> {
    return this.httpClient.post<OauthTokenResponse>(`/oauth/token`, oauthTokenRequest);
  }

  refresh(oauthRefreshRequest: OauthRefreshRequest): Observable<OauthTokenResponse> {
    return this.httpClient.post<OauthTokenResponse>(`/oauth/refresh`, oauthRefreshRequest)
      .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          localStorage.setItem(TokensEnum.ACCESS_TOKEN, res.access_token);
          localStorage.setItem(TokensEnum.REFRESH_TOKEN, res.refresh_token);
          localStorage.setItem(TokensEnum.TOKEN_TYPE, res.token_type);

          return res;
        })
      );
  }

  loginFacebook(): Observable<SocialUser> {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    return this.authService.authState;
  }
}
