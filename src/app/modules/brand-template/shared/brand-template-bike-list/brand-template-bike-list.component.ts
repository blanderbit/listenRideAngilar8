import {Component, Input} from '@angular/core';

@Component({
  selector: 'lnr-brand-template-bike-list',
  templateUrl: './brand-template-bike-list.component.html',
  styleUrls: ['./brand-template-bike-list.component.scss']
})
export class BrandTemplateBikeListComponent {
  @Input() response;

  getUniqueCitiesList() {
    return [...new Set(this.response.map(({en_city}) => en_city))];
  }

  getSortedBikes(city: string) {
    return this.response.map(
      bike => bike.en_city === city && bike
    );
  }
}
