import {Component, Input, OnInit} from '@angular/core';
import {EventInfo} from '@api/api-events/types';

@Component({
  selector: 'lnr-event-welcome-screen',
  templateUrl: './event-welcome-screen.component.html',
  styleUrls: ['./event-welcome-screen.component.scss']
})
export class EventWelcomeScreenComponent implements OnInit {
  @Input() event: EventInfo;

  constructor() {
  }

  ngOnInit() {
  }

}
