export interface SignUpRequest {
  user: {
    email: string;
    password: string;
    company_name?: string;
    first_name: string;
    last_name: string;
    language: string;
  };
  notification_preference: {
    newsletter: true
  };
  is_shop: boolean;
  recaptcha_token: string;
}
