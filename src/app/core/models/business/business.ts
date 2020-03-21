export interface Business {
  id: number;
  user_id: number;
  company_name: string;
  // TODO: ask BE for type
  vat: any;
  insuranceEnabled: boolean;
  // TODO: ask BE for type
  timeSlots: any[];
}

export interface TimeSlot {
  startTime: { hour: number; minute: number };
  endTime: { hour: number; minute: number };
}
export type TimeSlots = [TimeSlot, TimeSlot];
