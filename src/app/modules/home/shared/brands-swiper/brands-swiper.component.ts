import {Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'lnr-brands-swiper',
  templateUrl: './brands-swiper.component.html',
  styleUrls: ['./brands-swiper.component.scss']
})
export class BrandsSwiperComponent implements OnInit {
  brands;

  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 3,
    slideToClickedSlide: true,
    mousewheel: true,
    watchSlidesProgress: true,
    keyboard: true,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    spaceBetween: 24,
    pagination: {el: '.swiper-pagination', clickable: true},
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      960: {
        slidesPerView: 2
      }
    }
  };

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.apiSeoService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }
}
