import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {ExpandedBikeData} from '@models/bike/bike.types';
import {mobiscroll, MbscRangeOptions} from '@mobiscroll/angular';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {getPricesByDay, PricesByDay} from '@shared/helpers/price-helper';

mobiscroll.settings = {
  theme: 'material',
  themeVariant: 'light'
};

const now = new Date();

@Component({
  selector: 'lnr-booking-widget',
  templateUrl: './booking-widget.component.html',
  styleUrls: ['./booking-widget.component.scss']
})
export class BookingWidgetComponent implements OnInit, OnChanges {
  public datesRange = [now, now];
  public prices: PricesByDay;
  public shownPrices = [];

  rangeSettings: MbscRangeOptions = {
    controls: ['calendar', 'time'],
    dateFormat: 'd M',
    timeFormat: 'H:ii',
    lang: this.apiSeoService.retrieveLocale()
  };

  @Input() bikeData?: ExpandedBikeData;

  constructor(private apiSeoService: ApiSeoService) {}

  ngOnChanges({bikeData}: SimpleChanges): void {
    if (bikeData.currentValue) {
      this.prices = getPricesByDay(bikeData.currentValue.prices);
    }
  }

  ngOnInit() {}
}
