import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AllEvents, EventInfo} from '@api/api-events/types';

@Injectable({
  providedIn: 'root'
})
export class ApiEventsService {
  constructor(private httpClient: HttpClient) {
  }

  getEventName() {
    const url = window.location.href;
    return url.substr(url.lastIndexOf('/') + 1);
  }

  getAllEvents(): Observable<AllEvents> {
    return this.httpClient.get<AllEvents>(`/events`);
  }

  getEvent(): Observable<EventInfo> {
    return this.httpClient.get<EventInfo>(`/events/${this.getEventName()}`);
  }
}
