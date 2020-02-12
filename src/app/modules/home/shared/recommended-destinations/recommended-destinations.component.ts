import {Component, OnInit} from '@angular/core';
import {ApiSeoService} from '@api/api-seo/api-seo.service';

@Component({
  selector: 'lnr-recommended-destinations',
  templateUrl: './recommended-destinations.component.html',
  styleUrls: ['./recommended-destinations.component.scss']
})
export class RecommendedDestinationsComponent implements OnInit {
  cities;

  constructor(public apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.apiSeoService.getRecommendedCities().subscribe((data) => {
      return this.cities = data;
    });
  }
}
