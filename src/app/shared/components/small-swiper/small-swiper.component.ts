import {Component, Input, OnInit} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-small-swiper',
  templateUrl: './small-swiper.component.html',
  styleUrls: ['./small-swiper.component.scss']
})
export class SmallSwiperComponent implements OnInit {
  @Input() responses;
  @Input() link = '';
  private smallSwiper: Swiper;

  constructor() {
  }

  ngOnInit() {
    this.smallSwiper = new Swiper('.small-swiper', {
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 3,
      initialSlide: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        960: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        740: {
          slidesPerView: 2,
          spaceBetween: 10
        },
      },
      observer: true,
      watchOverflow: true
    });
  }
}
