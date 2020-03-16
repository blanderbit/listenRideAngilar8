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
  text: string;
  description: string;
  fullname: string;
  facebook_id?: string;
  user_id?: number;
  picture?: string;
}
