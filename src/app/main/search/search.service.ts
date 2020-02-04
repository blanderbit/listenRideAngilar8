import {Injectable} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {SearchPayload} from './search.types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {
  }

  public getRide(payload: SearchPayload) {
    return this.apiService.getList('rides', {params: payload});
  }

  public getSingleBike(bikeId: string) {
    return this.apiService.getSingle('rides', bikeId, {params: {light: true}});
  }

  public getUnavailableRides(startDate, duration) {
    return this.apiService.getList('rides/unavailable', {params: {start_date: startDate, duration}});
  }
}
