import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';

export interface OauthTokenRequest {
  email: string;
  password: string;
  grant_type: OauthGrantTypeEnum;
}
