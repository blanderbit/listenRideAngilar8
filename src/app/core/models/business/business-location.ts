export interface BusinessLocation {
  id?: number;
  street?: string;
  zip?: string;
  city?: string;
  country?: string;
  primary?: boolean;
  first_name?: string;
  last_name?: string;
  lat?: number;
  lng?: number;
  name?: string;
  vat?: string;

  // internal field
  number?: number;
}
