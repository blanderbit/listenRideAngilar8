import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {Bike} from '@models/bike/bike.types';
import {Observable} from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-bike-tile-swiper',
  templateUrl: './bike-card-swiper.component.html',
  styleUrls: ['./bike-card-swiper.component.scss']
})
export class BikeCardSwiperComponent implements OnInit, AfterViewInit {
  bikes$: Observable<Array<Bike>>;
  public bikeSwiper;

  swiperConfig() {
    this.bikeSwiper = new Swiper('.swiper-bikes', {
      direction: 'horizontal',
      slidesPerView: 3,
      centeredSlides: false,
      spaceBetween: -30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        960: {
          slidesPerView: 3,
          spaceBetween: -30
        },
        760: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        560: {
          slidesPerView: 2,
          spaceBetween: 10
        }
      }
    });
  }

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.bikes$ = this.apiSeoService.getTopBikes();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 1000);
  }
}
