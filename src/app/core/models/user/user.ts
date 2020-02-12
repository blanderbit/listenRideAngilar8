import {BusinessLocation} from '@models/business/business-location';
import {Business} from '@models/business/business';

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
    profile_picture: { url: string; }
  };
  confirmed_phone: boolean;

  locations?:
    BusinessLocation[] |
    {primary: BusinessLocation} |
    {billing: BusinessLocation};
  rating_lister?: 0;
  rating_rider?: 0;
  status?: 1;
  has_phone_number?: false;
  has_description?: true;
  has_business?: true;
  confirmed_email?: true;
  phone_number?: null;
  unconfirmed_phone?: null;
  pretty_phone_number?: string;
  balance?: 0;
  notification_preference?: any;
  rides?: any[];
  ratings?: any[];
  business: Business;
  me?: { admin?: boolean };

}
