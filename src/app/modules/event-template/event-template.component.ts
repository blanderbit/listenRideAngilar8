import {Component, OnInit} from '@angular/core';
import {AllEvents, ApiEventsService} from '@api/api-events';
import {EventInfo} from '@api/api-events/types';
import {Observable} from 'rxjs';

@Component({
  selector: 'lnr-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.scss']
})
export class EventTemplateComponent implements OnInit {
  event$: Observable<EventInfo>;

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.event$ = this.apiEventsService.getEvent();
  }

}
