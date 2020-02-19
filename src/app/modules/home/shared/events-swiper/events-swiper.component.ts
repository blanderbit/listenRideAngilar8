import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import Swiper from 'swiper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SeoRequest} from '@models/seo/seo-requests';

@Component({
  selector: 'lnr-events-swiper',
  templateUrl: './events-swiper.component.html',
  styleUrls: ['./events-swiper.component.scss']
})
export class EventsSwiperComponent implements OnInit, AfterViewInit {
  events$: Observable<SeoRequest>;
  public eventSwiper;

  swiperConfig() {
    this.eventSwiper = new Swiper('.swiper-events', {
      direction: 'horizontal',
      slidesPerView: 3,
      centeredSlides: false,
      loop: false,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        960: {
          slidesPerView: 2
        }
      }
    });

  }

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.events$ = this.apiSeoService.getEvents().pipe(
      map(response => response.data));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 0);
  }
}
