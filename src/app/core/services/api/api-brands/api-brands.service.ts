import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand, BrandInfo } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiBrandsService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Array<Brand>> {
    return this.httpClient.get<Array<Brand>>('/brand_pages');
  }

  getBrand(name: string): Observable<BrandInfo> {
    return this.httpClient.get<BrandInfo>(`/brand_pages/${name}`);
  }
}
