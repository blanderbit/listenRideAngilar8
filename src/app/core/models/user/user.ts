export interface User {
  id: number;
  first_name: string;
  last_name: string;
  token: string;
  email: string;
  facebook_id: string;
  // TODO: ASK BE for enum
  sign_up_type: any;
  // TODO: ASK BE for type
  unread_messages: any;
  description: string;
  has_address: boolean;
  ref_code: string;
  // TODO: ASK BE for enum
  ref_status: any;
  profile_picture: {
    url: string;
  };
  confirmed_phone: boolean;
}
