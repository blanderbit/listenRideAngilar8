import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Observable} from 'rxjs';
import {Bike} from '@models/bike/bike.types';

@Injectable({providedIn: 'root'})
export class ApiRidesService {

  constructor(private httpClient: HttpClient) {
  }

  // TODO: add type
  getByQuery(params: any): Observable<any> {
    return this.httpClient.get<any>(`/rides`, {params});
  }

  getById(id: any, light = true): Observable<Bike> {
    const params: any = {light};
    return this.httpClient.get<Bike>(`/rides/${id}`, {params});
  }

  getByUserId(userId: number): Observable<any> {
    return this.httpClient.get<Bike[]>(`/users/${userId}/rides`);
  }

  getBikeJobStatus(bikeId: number, jobId: number): Observable<any> {
    return this.httpClient.get(`/rides/${bikeId}/status/${jobId}`);
  }

  createBike(data): Observable<any> {
    return this.httpClient.post(`/rides`, data);
  }

  duplicateBike(bikeId: number, payload: any): Observable<any> {
    console.log(payload);
    return this.httpClient.post(`/rides/${bikeId}/duplicates`, payload);
  }

  updateBike(bikeId: number, bike: any): Observable<any> {
    return this.httpClient.put(`/rides/${bikeId}`, bike);
  }

  deleteBike(bikeId: number): Observable<any> {
    return this.httpClient.delete(`/rides/${bikeId}`);
  }

  clusterizeBikes(bikeIds: number[]): Observable<any> {
    return this.httpClient.post(`/clusters`, {cluster: {ride_ids: bikeIds}});
  }

  declusterizeBikes(clusterId: number): Observable<any> {
    return this.httpClient.put(`/clusters/${clusterId}/unmerge`, {});
  }
}
