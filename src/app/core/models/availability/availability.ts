export interface Availability {
  hours: {
    0?: Period[];
    1?: Period[];
    2?: Period[];
    3?: Period[];
    4?: Period[];
    5?: Period[];
    6?: Period[];
  };
  enabled: boolean;
}

export interface Period {
  start_at: number;
  duration: number;
}
