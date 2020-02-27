import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import Swiper from 'swiper';
import {Brand, ApiBrandsService} from '@api/api-brands';

@Component({
  selector: 'lnr-brands-swiper',
  templateUrl: './brands-swiper.component.html',
  styleUrls: ['./brands-swiper.component.scss']
})
export class BrandsSwiperComponent implements OnInit, AfterViewInit {
  brands$: Observable<Array<Brand>>;
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

  constructor(private brandsService: ApiBrandsService) {
  }

  ngOnInit() {
    this.brands$ = this.brandsService.getAll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 1000);
  }
}
