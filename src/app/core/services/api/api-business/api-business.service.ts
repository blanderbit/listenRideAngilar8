import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessCreateRequest } from '@models/business/business-create-request';
import { Business } from '@models/business/business';

@Injectable({ providedIn: 'root' })
export class ApiBusinessService {
  constructor(private httpClient: HttpClient) {}

  create(businessCreateRequest: BusinessCreateRequest): Observable<Business> {
    return this.httpClient.post<Business>('/businesses', businessCreateRequest);
  }

  update(
    businessId: number,
    business: { business: Partial<Business> },
  ): Observable<Business> {
    return this.httpClient.put<Business>(`/businesses/${businessId}`, business);
  }
}
