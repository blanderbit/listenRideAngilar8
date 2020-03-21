import { TokenTypeEnum } from '@enums/token-type.enum';

export interface OauthTokenResponse {
  access_token: string;
  token_type: TokenTypeEnum;
  expires_in: number;
  refresh_token: string;
  created_at: number;
}
