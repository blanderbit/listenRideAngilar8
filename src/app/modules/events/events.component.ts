import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiEventsService, Event} from '@api/api-events';

@Component({
  selector: 'lnr-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<Array<Event>>;

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.events$ = this.apiEventsService.getAllEvents();
  }
}
