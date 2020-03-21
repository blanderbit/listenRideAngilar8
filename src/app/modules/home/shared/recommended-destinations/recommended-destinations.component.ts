import { Component, OnInit } from '@angular/core';
import { ApiSeoService } from '@api/api-seo/api-seo.service';
import { Observable } from 'rxjs';
import { RecommendedDestinationsRequest } from '@models/seo/seo-requests';

@Component({
  selector: 'lnr-recommended-destinations',
  templateUrl: './recommended-destinations.component.html',
  styleUrls: ['./recommended-destinations.component.scss'],
})
export class RecommendedDestinationsComponent implements OnInit {
  cities$: Observable<Array<RecommendedDestinationsRequest>>;

  // TODO add swiper
  constructor(public apiSeoService: ApiSeoService) {}

  ngOnInit() {
    this.cities$ = this.apiSeoService.getRecommendedCities();
  }
}
