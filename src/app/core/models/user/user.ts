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

  locations?: any;
  // locations?:
  //   BusinessLocation[] |
  //   {primary: BusinessLocation} |
  //   {billing: BusinessLocation};

  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  lat?: string;
  lng?: string;

  rating_lister?: number;
  rating_rider?: number;
  status?: number;
  has_phone_number?: boolean;
  has_description?: boolean;
  has_business?: boolean;
  confirmed_email?: boolean;
  phone_number?: string;
  unconfirmed_phone?: string;
  pretty_phone_number?: string;
  balance?: number;
  notification_preference?: any;
  rides?: any[];
  ratings?: any[];
  business: Business;
  me?: { admin?: boolean };

}
