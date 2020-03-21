export interface AllEvents {
  past_events: SeoEvent[];
  future_events: SeoEvent[];
}

export interface SeoEvent {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  pretty_date?: string;
  location?: string;
  title?: string;
  description?: string;
  thumb_image?: string;
}

export interface EventInfo {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  pretty_date?: string;
  location?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  description_title?: string;
  bikes_title?: string;
  bikes_description?: string;
  meta_title?: string;
  meta_description?: string;
  hero_image?: string;
  logo?: string;
  related_events?: RelatedEvents[];
  testimonials?: Testimonial[];
  rides: EventsBikes[];
}

export interface RelatedEvents {
  id: number;
  name: string;
  thumb_image?: string;
}

export interface Testimonial {
  id: number;
  fullname: string;
  facebook_id?: string;
  user_id: number;
  description: string;
  text: string;
  picture: string;
}

export interface EventsBikes {
  id: number;
  name: string;
  brand: string;
  category: number;
  size: number;
  rating_average?: number;
  rating_total?: number;
  pretty_size: string;
  daily_price: number;
  weekly_price: string;
  image_file: string;
  cluster?: {
    id: number;
    sizes: [
      {
        size: number;
        amount: number;
      },
    ];
    primary_id: number;
    variations: [
      {
        id: number;
        size: number;
      },
    ];
  };
}
