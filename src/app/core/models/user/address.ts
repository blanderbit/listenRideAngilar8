export interface Address {
  street: string;
  number?: string | number;
  zip: string | number;
  city: string;
  country: string;
  primary: boolean;
}
