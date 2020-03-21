import { OauthGrantTypeEnum } from '@enums/oauth-grant-type.enum';

export interface OauthTokenFacebookRequest {
  assertion: string;
  grant_type: OauthGrantTypeEnum;
}
