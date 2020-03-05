export interface SignUpFacebookRequest {
  user: {
    facebook_access_token: string;
  };
  is_shop: boolean;
  notification_preference: {
    newsletter: boolean;
  };
}
