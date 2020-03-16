import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiEventsService} from '@api/api-events';
import {AllEvents} from '@api/api-events/types';

@Component({
  selector: 'lnr-events-swiper',
  templateUrl: './events-swiper.component.html',
  styleUrls: ['./events-swiper.component.scss']
})
export class EventsSwiperComponent implements OnInit {
  events$: Observable<AllEvents>;

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.events$ = this.apiEventsService.getAllEvents();
  }
}
