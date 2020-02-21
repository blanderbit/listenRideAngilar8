import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import Swiper from 'swiper';
import {Observable} from 'rxjs';
import {SeoEventRequest} from '@models/seo/seo-requests';

@Component({
  selector: 'lnr-events-swiper',
  templateUrl: './events-swiper.component.html',
  styleUrls: ['./events-swiper.component.scss']
})
export class EventsSwiperComponent implements OnInit, AfterViewInit {
  events$: Observable<Array<SeoEventRequest>>;
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

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.events$ = this.apiSeoService.getEvents();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 1000);
  }
}
