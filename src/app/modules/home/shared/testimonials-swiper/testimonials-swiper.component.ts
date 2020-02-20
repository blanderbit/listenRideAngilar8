import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {Observable} from 'rxjs';
import {TestimonialsRequest} from '@models/seo/seo-requests';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-testimonal-swiper',
  templateUrl: './testimonials-swiper.component.html',
  styleUrls: ['./testimonials-swiper.component.scss']
})
export class TestimonialsSwiperComponent implements OnInit, AfterViewInit {
  responses$: Observable<Array<TestimonialsRequest>>;
  public testimonialsSwiper;

  swiperConfig() {
    this.testimonialsSwiper = new Swiper('.testimonials-swiper', {
      direction: 'horizontal',
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        960: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    });
  }

  constructor(public apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.responses$ = this.apiSeoService.getTestimonials();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 1000);
  }
}
