import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BikeImage } from '@models/bike/bike.types';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-bike-images-swiper',
  templateUrl: './bike-images-swiper.component.html',
  styleUrls: ['./bike-images-swiper.component.scss'],
})
export class BikeImagesSwiperComponent implements OnInit, OnDestroy {
  @Input()
  images: Array<BikeImage>;

  private swiper: Swiper;

  ngOnInit() {
    this.swiper = new Swiper('.swiper-container', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 1,
      initialSlide: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      watchOverflow: true,
    });
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }
}
