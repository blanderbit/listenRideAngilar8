export interface Business {
  id: number;
  user_id: number;
  company_name: string;
  // TODO: ask BE for type
  vat: any;
  insurance_enabled: boolean;
  // TODO: ask BE for type
  time_slots: any[];
}
