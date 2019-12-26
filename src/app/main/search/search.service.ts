import { Injectable } from '@angular/core';
import {ApiService} from "../../core/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }

  public getRide(city, sizes) {
    return this.apiService.getList('rides', {params: {'location' : city, 'sizes': sizes}});
  }

  public getUnavailableRides(startDate, duration) {
    return this.apiService.getList('rides/unavailable', {params: {'start_date' : startDate, 'duration': duration}});
  }
}
