import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {Observable} from 'rxjs';
import {SeoBrandRequest} from '@models/seo/seo-requests';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-brands-swiper',
  templateUrl: './brands-swiper.component.html',
  styleUrls: ['./brands-swiper.component.scss']
})
export class BrandsSwiperComponent implements OnInit, AfterViewInit {
  brands$: Observable<Array<SeoBrandRequest>>;
  public brandSwiper;

  swiperConfig() {
    this.brandSwiper = new Swiper('.swiper-brands', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        960: {
          slidesPerView: 3,
          spaceBetween: 20,
        }
      }
    });

  }

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.brands$ = this.apiSeoService.getBrands();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 1000);
  }
}
