import { Component, OnInit } from '@angular/core';
import { ApiSeoService } from '@api/api-seo/api-seo.service';
import { Observable } from 'rxjs';
import { TestimonialsRequest } from '@models/seo/seo-requests';

@Component({
  selector: 'lnr-testimonal-swiper',
  templateUrl: './testimonials-swiper.component.html',
  styleUrls: ['./testimonials-swiper.component.scss'],
})
export class TestimonialsSwiperComponent implements OnInit {
  responses$: Observable<Array<TestimonialsRequest>>;

  constructor(public apiSeoService: ApiSeoService) {}

  ngOnInit() {
    this.responses$ = this.apiSeoService.getTestimonials();
  }
}
