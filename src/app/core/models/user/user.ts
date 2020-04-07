import { Business } from '@models/business/business';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  facebookId: string;
  // TODO: ASK BE for enum
  signUpType: any;
  // TODO: ASK BE for type
  unreadMessages: any;
  description: string;
  hasAddress: boolean;
  refCode: string;
  // TODO: ASK BE for enum
  refStatus: any;
  profilePicture: {
    profilePicture: { url: string };
  };
  confirmedPhone: boolean;
  confirmedPayment: boolean;

  locations?: any;

  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  lat?: string;
  lng?: string;

  ratingLister?: number;
  ratingRider?: number;
  status?: number;
  hasPhoneNumber?: boolean;
  hasDescription?: boolean;
  hasBusiness?: boolean;
  confirmedEmail?: boolean;
  phoneNumber?: string;
  unconfirmedPhone?: string;
  prettyPhoneNumber?: string;
  balance?: number;
  notificationPreference?: any;
  rides?: any[];
  ratings?: Array<Rating>;
  business: Business;
  me?: { admin?: boolean };
  directBookingScheme?: boolean;
  openingHours?: {
    hours: {
      [key: number]: Array<{ duration: number; startAt: number }>;
    };
  };
}

export interface Rating {
  authorId: number;
  authorName: string;
  authorPicture: string;
  score: number;
  message?: string;
  createdAt?: string;
}
