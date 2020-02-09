import {Component, Input} from '@angular/core';
import {Bike} from '@models/bike/bike.types';

@Component({
  selector: 'lnr-bike-card-mobile',
  templateUrl: './bike-card-mobile.component.html',
  styleUrls: ['./bike-card-mobile.component.scss']
})
export class BikeCardMobileComponent {
  @Input() bike: Bike;
}
