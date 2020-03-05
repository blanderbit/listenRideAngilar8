import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swiper from 'swiper';
import {Observable} from 'rxjs';
import {ApiEventsService, Event} from '@api/api-events';

@Component({
  selector: 'lnr-events-swiper',
  templateUrl: './events-swiper.component.html',
  styleUrls: ['./events-swiper.component.scss']
})
export class EventsSwiperComponent implements OnInit, AfterViewInit {
  events$: Observable<Array<Event>>;
  public eventSwiper;

  swiperConfig() {
    this.eventSwiper = new Swiper('.swiper-events', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      centeredSlides: false,
      loop: false,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        960: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      }
    });

  }

  constructor(private apiEventsService: ApiEventsService) {
  }

  ngOnInit() {
    this.events$ = this.apiEventsService.getAllEvents();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 1000);
  }
}
