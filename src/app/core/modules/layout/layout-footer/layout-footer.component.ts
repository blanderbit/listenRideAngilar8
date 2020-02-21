import {Component, OnInit} from '@angular/core';
import {LayoutFooterListLinksConfig} from '@core/modules/layout/layout-footer/layout-footer-list-links.config';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {Observable} from 'rxjs';
import {CountriesForFooter} from '@models/seo/seo-requests';

@Component({
  selector: 'lnr-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {
  countries$: Observable<CountriesForFooter[]>;
  links = LayoutFooterListLinksConfig;
  currentYear: number = new Date().getFullYear();

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.countries$ = this.apiSeoService.getCountriesFooter();
  }
}
