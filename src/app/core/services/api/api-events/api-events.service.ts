import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '@api/api-events';
import {EventInfo} from '@api/api-events/types';

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

  getAllEvents(): Observable<Array<Event>> {
    return this.httpClient.get<Array<Event>>(`/events`);
  }

  getEvent(): Observable<Array<EventInfo>> {
    return this.httpClient.get<Array<EventInfo>>(`/events/${this.getEventName()}`);
  }
}
