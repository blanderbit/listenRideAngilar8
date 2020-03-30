export interface Job {
  id: number;
  fullTime: boolean;
  active: boolean;
  title: string;
  location: string;
  role: Array<string>;
  required: Array<string>;
  offer: Array<string>;
  roleHeadline: string;
  requirementHeadline: string;
  offerHeadline: string;
}
