import { CountryCode } from 'libphonenumber-js';

export interface PhoneControlOutput {
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  countryCode: CountryCode;
  dialCode: string;
}
