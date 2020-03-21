import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllEvents, EventInfo } from '@api/api-events/types';

@Injectable({
  providedIn: 'root',
})
export class ApiEventsService {
  constructor(private httpClient: HttpClient) {}

  getAllEvents(): Observable<AllEvents> {
    return this.httpClient.get<AllEvents>('/events');
  }

  getEvent(name: string): Observable<EventInfo> {
    return this.httpClient.get<EventInfo>(`/events/${name}`);
  }
}
