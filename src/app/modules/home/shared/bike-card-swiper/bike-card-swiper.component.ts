import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {Bike} from '@models/bike/bike.types';
import {Observable} from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-bike-tile-swiper',
  templateUrl: './bike-card-swiper.component.html',
  styleUrls: ['./bike-card-swiper.component.scss']
})
export class BikeCardSwiperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  bikes: Observable<Array<Bike>>;
  public bikeSwiper;

  swiperConfig() {
    this.bikeSwiper = new Swiper('.swiper-bikes', {
      speed: 400,
      spaceBetween: 10,
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

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.bikes = this.apiSeoService.getFeaturedBikes();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperConfig();
    }, 0);
  }

  ngOnDestroy(): void {
    this.bikeSwiper.destroy(true, true);
  }
}
