export interface BusinessLocation {
  street: string;
  zip: string;
  city: string;
  country: string;
  primary?: boolean;

  // internal field
  number?: number;
}
