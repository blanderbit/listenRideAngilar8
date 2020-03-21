import { Component, OnInit } from '@angular/core';
import { ApiSeoService } from '@api/api-seo/api-seo.service';

@Component({
  selector: 'lnr-popular-destination',
  templateUrl: './popular-destination.component.html',
  styleUrls: ['./popular-destination.component.scss'],
})
export class PopularDestinationComponent implements OnInit {
  cities;

  constructor(public apiSeoService: ApiSeoService) {}

  ngOnInit() {
    this.apiSeoService.getPopularDestinations().subscribe(data => {
      this.cities = data;
    });
  }
}
