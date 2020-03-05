import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiEventsService} from '@api/api-events';
import {EventInfo} from '@api/api-events/types';

@Component({
  selector: 'lnr-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.scss']
})
export class EventTemplateComponent implements OnInit {
  events;

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.apiEventsService.getEvent().subscribe((data) => {
      return this.events = data;
    });
  }
}
