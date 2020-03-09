import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AllEvents, ApiEventsService} from '@api/api-events';

@Component({
  selector: 'lnr-events-small-swiper',
  templateUrl: './events-swiper.component.html',
  styleUrls: ['./events-swiper.component.scss']
})
export class EventsSwiperComponent implements OnInit {
  allEvent$: Observable<AllEvents>;

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.allEvent$ = this.apiEventsService.getAllEvents();
  }

}
