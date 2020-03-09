import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-testimonials-swiper',
  templateUrl: './testimonials-swiper.component.html',
  styleUrls: ['./testimonials-swiper.component.scss']
})
export class TestimonialsSwiperComponent implements OnInit, OnDestroy {
  @Input() responses;
  private swiper: Swiper;

  constructor() {
  }

  ngOnInit() {
    this.swiper = new Swiper('.testimonials-swiper', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 1,
      initialSlide: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      observer: true,
      watchOverflow: true
    });
  }

  ngOnDestroy(): void {
    this.swiper.destroy(true, true);
  }
}
