export interface SeoEventRequest {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  title?: string;
  description?: string;
  thumb_image?: string;
}


export interface RecommendedDestinationsRequest {
  id: number;
  name: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
    nl: string;
  };
  image_url: string;
}

export interface CountriesForFooter {
  id: number;
  name: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
    nl: string;
  };
}

export interface TestimonialsRequest {
  id: number;
  text: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
    nl: string;
  };
  description: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
    nl: string;
  };
  fullname: string;
  facebook_id?: string;
  user_id?: number;
  picture?: string;
}
