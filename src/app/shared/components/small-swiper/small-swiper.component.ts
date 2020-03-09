import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-small-swiper',
  templateUrl: './small-swiper.component.html',
  styleUrls: ['./small-swiper.component.scss']
})
export class SmallSwiperComponent implements OnInit, OnDestroy {
  @Input() responses;
  @Input() link = '';
  private swiper: Swiper;

  constructor() {
  }

  ngOnInit() {
    this.swiper = new Swiper('.small-swiper', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 3,
      initialSlide: 0,
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
