import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Brand} from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiBrandsService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Array<Brand>> {
    return this.httpClient.get<Array<Brand>>(`/brand_pages`);
  }
}
