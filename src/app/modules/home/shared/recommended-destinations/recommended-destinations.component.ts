import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-recommended-destinations',
  templateUrl: './recommended-destinations.component.html',
  styleUrls: ['./recommended-destinations.component.scss']
})
export class RecommendedDestinationsComponent implements OnInit, AfterViewInit {
  cities;
  public citiesSwiper;

// TODO add swiper
  // swiperConfig() {
  //   this.citiesSwiper = new Swiper('.swiper-recommended-destinations', {
  //     direction: 'horizontal',
  //     slidesPerView: 1,
  //     centeredSlides: false,
  //     loop: false,
  //     spaceBetween: 10,
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev'
  //     },
  //     breakpoints: {
  //       960: {
  //         slidesPerView: 2
  //       }
  //     }
  //   });
  //
  // }


  constructor(public apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.apiSeoService.getRecommendedCities().subscribe((data) => {
      this.cities = data;
    });
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.swiperConfig();
    // }, 500);
  }
}
