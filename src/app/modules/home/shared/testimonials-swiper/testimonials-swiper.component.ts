import {Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ApiSeoService} from '@api/api-seo/api-seo.service';

@Component({
  selector: 'lnr-testimonal-swiper',
  templateUrl: './testimonials-swiper.component.html',
  styleUrls: ['./testimonials-swiper.component.scss']
})
export class TestimonialsSwiperComponent implements OnInit {
  responses;
  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next'
    },
    breakpoints: {
      960: {
        slidesPerView: 1
      }
    }
  };

  constructor(public apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.apiSeoService.getTestimonials().subscribe((data) => {
      this.responses = data;
      console.log('data', data);
      console.log('name', data.name);
    });
  }

}
