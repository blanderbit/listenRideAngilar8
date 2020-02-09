import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '@models/bike/bike.types';

@Component({
  selector: 'lnr-bike-card',
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.scss']
})
export class BikeCardComponent {
  @Input() bike: Bike;
  @Input() isMapView = false;
  @Input() isMobileView = true;
  @Input() isMobileMap = false;
}
