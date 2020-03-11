import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Bike, ExpandedBikeData} from '@models/bike/bike.types';
import {CamelCaseResponseKeys} from '@shared/decorators/camelcase-response-keys';
import {RideResponse} from '@api/api-rides/types';
import {processRideResponse} from '@api/api-rides/helpers/process-ride-response';

@Injectable({providedIn: 'root'})
export class ApiRidesService {
  constructor(private httpClient: HttpClient) {}

  // TODO: add type
  getByQuery(params: any): Observable<any> {
    return this.httpClient.get<any>(`/rides`, {params});
  }

  @CamelCaseResponseKeys()
  getExpandedBikeData(bikeId: string): Observable<ExpandedBikeData> {
    return this.httpClient
      .get<RideResponse>(`/rides/${bikeId}`)
      .pipe(map(processRideResponse));
  }

  getById(bikeId: string, light = true): Observable<Bike> {
    const params: any = {light};
    return this.httpClient.get<Bike>(`/rides/${bikeId}`, {params});
  }

  getByUserId(userId: number, params?: any): Observable<any> {
    return this.httpClient.get<Bike[]>(`/users/${userId}/rides`, {params});
  }

  getBikeJobStatus(bikeId: number, jobId: number): Observable<any> {
    return this.httpClient.get(`/rides/${bikeId}/status/${jobId}`);
  }

  createBike(data): Observable<any> {
    return this.httpClient.post(`/rides`, data);
  }

  duplicateBike(bikeId: number | string, payload: any): Observable<any> {
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

  getBikesByCluster(clusterId: number, start_date, duration): Observable<any> {
    return this.httpClient.get(`/clusters/${clusterId}?start_date=${start_date}&duration${duration}`);
  }
}
