import { Invoice, Settlement } from '@models/invoices/invoices';

export interface Reports {
  asRider?: {
    [key: string]: Array<Invoice>;
  };
  asLister?: {
    [key: string]: Array<Invoice>;
  };
  settlement?: {
    [key: string]: Array<Settlement>;
  };
}
