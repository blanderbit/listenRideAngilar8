import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiEventsService} from '@api/api-events';
import {AllEvents} from '@api/api-events/types';

@Component({
  selector: 'lnr-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<AllEvents>;

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.events$ = this.apiEventsService.getAllEvents();
  }
}
