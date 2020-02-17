import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-events-swiper',
  templateUrl: './events-swiper.component.html',
  styleUrls: ['./events-swiper.component.scss']
})
export class EventsSwiperComponent implements OnInit, AfterViewInit {
  events;
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
    this.apiSeoService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 0);
  }
}
