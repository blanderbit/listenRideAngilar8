// TODO Fix to avoid eslint-disable (see below in file)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bike, ExpandedBikeData } from '@models/bike/bike.types';
import { CamelCaseResponseKeys } from '@shared/decorators/camelcase-response-keys';
import { RideResponse, EngagedTimeResponse } from '@api/api-rides/types';
import { processRideResponse } from '@api/api-rides/helpers/process-ride-response';
import * as snakeCaseKeys from 'snakecase-keys';
@Injectable({ providedIn: 'root' })
export class ApiRidesService {
  constructor(private httpClient: HttpClient) {}

  // TODO: add type
  getByQuery(params: any): Observable<any> {
    return this.httpClient.get<any>('/rides', { params });
  }

  @CamelCaseResponseKeys()
  getExpandedBikeData(bikeId: string): Observable<ExpandedBikeData> {
    return this.httpClient
      .get<RideResponse>(`/rides/${bikeId}`)
      .pipe(map(processRideResponse));
  }

  getById(bikeId: string, light = true): Observable<Bike> {
    const params: any = { light };
    return this.httpClient.get<Bike>(`/rides/${bikeId}`, { params });
  }

  getByUserId(userId: number, params?: any): Observable<any> {
    return this.httpClient.get<Bike[]>(`/users/${userId}/rides`, { params });
  }

  getBikeJobStatus(bikeId: number, jobId: number): Observable<any> {
    return this.httpClient.get(`/rides/${bikeId}/status/${jobId}`);
  }

  createBike(data): Observable<any> {
    return this.httpClient.post('/rides', data);
  }

  duplicateBike(bikeId: number | string, payload: any): Observable<any> {
    return this.httpClient.post(`/rides/${bikeId}/duplicates`, payload);
  }

  updateBike(bikeId: number, bike: any): Observable<any> {
    return this.httpClient.put(`/rides/${bikeId}`, bike);
  }

  deleteBike(bikeId: number): Observable<any> {
    return this.httpClient.delete(`/rides/${bikeId}`);
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  clusterizeBikes(ride_ids: number[]): Observable<any> {
    return this.httpClient.post('/clusters', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      cluster: { ride_ids },
    });
  }

  declusterizeBikes(clusterId: number): Observable<any> {
    return this.httpClient.put(`/clusters/${clusterId}/unmerge`, {});
  }

  // TODO: Use snakeCase!
  // eslint-disable-next-line @typescript-eslint/camelcase
  getBikesByCluster(clusterId: number, start_date, duration): Observable<any> {
    return this.httpClient.get(
      // eslint-disable-next-line @typescript-eslint/camelcase
      `/clusters/${clusterId}?start_date=${start_date}&duration${duration}`,
    );
  }

  @CamelCaseResponseKeys()
  getEngagedTimeData(
    bikeId: number,
    startDate: string,
    endDate: string,
  ): Observable<EngagedTimeResponse> {
    const params = snakeCaseKeys({ startDate, endDate }) as {
      [key: string]: string;
    };
    return this.httpClient.get<EngagedTimeResponse>(
      `/rides/${bikeId}/engaged_time`,
      { params },
    );
  }
}
