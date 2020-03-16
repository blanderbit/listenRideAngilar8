import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Brand, ApiBrandsService} from '@api/api-brands';

@Component({
  selector: 'lnr-brands-swiper',
  templateUrl: './brands-swiper.component.html',
  styleUrls: ['./brands-swiper.component.scss']
})
export class BrandsSwiperComponent implements OnInit {
  brands$: Observable<Array<Brand>>;

  constructor(private brandsService: ApiBrandsService) {
  }

  ngOnInit() {
    this.brands$ = this.brandsService.getAll();
  }

}
