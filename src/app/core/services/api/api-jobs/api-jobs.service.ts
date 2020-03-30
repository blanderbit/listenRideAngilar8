import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CamelCaseResponseKeys } from '@shared/decorators/camelcase-response-keys';
import { Job } from '@models/jobs/jobs';

@Injectable({
  providedIn: 'root',
})
export class ApiJobsService {
  constructor(private httpClient: HttpClient) {}

  @CamelCaseResponseKeys()
  getJobs(): Observable<Array<Job>> {
    return this.httpClient.get<Array<Job>>('/jobs');
  }
}
