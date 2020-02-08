import {Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Observable} from 'rxjs';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})

export class ApiSeoService {

  constructor(private httpClient: HttpClient) {
  }

  getTopLocation(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/seo_cities/subfooter`);
  }

  getCountryDomain() {
    const url = window.location.host.split('.');
    const urlDomain = url[url.length - 1];
    return urlDomain === 'localhost:4200' ? 'com' : urlDomain;
  }

  retrieveLocale() {
    let language = '';
    const defaultLanguage = 'en';
    const availableLanguages = ['de', 'en', 'nl', 'it', 'es', 'fr'];
    const specialLanguages = {at: 'de'};

    const url = window.location.host.split('.');
    const urlLanguage = url[url.length - 1];

    if (urlLanguage !== ('localhost:4200') && availableLanguages.indexOf(urlLanguage) >= 0) {
      language = urlLanguage;
    } else {
      language = specialLanguages[urlLanguage] || defaultLanguage;
    }
    return language;
  }

  getPopularDestinations(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/seo_cities/popular_destinations?country_code=${this.getCountryDomain()}`);
  }

  getTopBikes(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/featured`);
  }

  getBrands(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/brand_pages`);
  }

  getTestimonials(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/seo_testimonials?page_type=home_page`);
  }
}
