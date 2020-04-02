import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSeoService } from '@api/api-seo/api-seo.service';
import { CamelCaseResponseKeys } from '@shared/decorators/camelcase-response-keys';
import { FaqsData } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiFaqsService {
  constructor(
    private httpClient: HttpClient,
    private apiSeoService: ApiSeoService,
  ) {}

  @CamelCaseResponseKeys()
  getFaqs(): Observable<FaqsData> {
    const locale = this.apiSeoService.retrieveLocale();
    return this.httpClient.get<FaqsData>(`/faqs?language=${locale}`);
  }
}
