import { Injectable } from '@angular/core';
import {ApiService} from "../../core/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) { }

  public getRide(city) {
    return this.apiService.getList('rides', {params: {'location' : city}});
  }
}
