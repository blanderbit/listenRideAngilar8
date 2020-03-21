import { Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'lnr-brand-template-welcome-screen',
  templateUrl: './brand-template-welcome-screen.component.html',
  styleUrls: ['./brand-template-welcome-screen.component.scss'],
})
export class BrandTemplateWelcomeScreenComponent implements OnInit {
  @Input() responses;

  @Input() logo: string;

  private swiper: Swiper;

  ngOnInit() {
    this.swiper = new Swiper('.swiper-container', {
      fadeEffect: {
        crossFade: true,
      },
      effect: 'fade',
      speed: 1500,
      spaceBetween: 0,
      slidesPerView: 1,
      centeredSlides: true,
      autoplay: {
        stopOnLastSlide: false,
        delay: 6000,
      },
      observer: true,
      watchOverflow: true,
    });
  }
}
