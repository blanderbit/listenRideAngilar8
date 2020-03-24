/* eslint-disable */
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
const moment = require('moment');
import { ApiSeoService } from '@api/api-seo/api-seo.service';
import { SizeListInterface } from '../../../modules/list-my-bike/model/models';
import { sizeList } from '@core/constants/filters.const';
import {
  RIDER_TAX,
  VAT_TAX,
} from '../../../modules/bikes-request-flow/consts/consts';

@Component({
  selector: 'lnr-book-widget',
  templateUrl: './book-widget.component.html',
  styleUrls: ['./book-widget.component.scss'],
})
export class BookWidgetComponent {
  @Input('insuranceEnable') insuranceEnable: boolean = true;
  @Input('priceForOne') priceForOne: number | string | any = 0;
  get priceForOneReformat() {
    return parseInt(this.priceForOne);
  }
  @Input('form') form: FormGroup;
  @Input('weekly') weekly: number | string | any = 0;
  @Input('coverage_total') coverage_total: number | string | any = 0;
  @Input('daily') daily: number | string | any = 0;
  @Input('datesRange') datesRange: Array<Date> = [];

  @Output('setData') setData = new EventEmitter();
  @Output('clickToNext') clickToNext = new EventEmitter();

  @Input() isLastStep: boolean;
  @ViewChild('mbscRange', { static: false }) mbscRange;
  result = {
    forDicount: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    real_day: 0,
    subtotal: 0,
    count: 0,
    subtotalDiscounted: 0,
    serviceFee: 0,
    coverageTotal: 0,
    premiumCoverage: 0,
    basicCoverage: 0,
    total: 0,
  };
  //TODO: update if decided to use this component.
  // rangeSettings: MbscRangeOptions = {
  //   controls: ['calendar', 'time'],
  //   dateFormat: 'd M',
  //   invalid: [{start: '00:00', end: moment(new Date).format('h')}],
  //   timeFormat: 'H:ii',
  //   lang: this.apiSeoService.retrieveLocale()
  // };

  sizeList: Array<SizeListInterface> = sizeList;

  constructor(private apiSeoService: ApiSeoService) {}

  setCalendarCounts(duration) {
    duration = parseInt(duration);
    const test = moment.duration(duration, 'seconds');
    const durationDay = test.days();
    // eslint-disable-next-line @typescript-eslint/camelcase
    const real_day = durationDay + 1;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.result.real_day = real_day;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.result.subtotal = this.priceForOneReformat * real_day;
    this.result.count = this.priceForOneReformat;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.result.forDicount = this.priceForOneReformat * real_day;
    const includeFee = true;
    let premiumCoverage = 0;
    let total = 0;
    if (this.insuranceEnable) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.result.premiumCoverage = premiumCoverage * real_day;
      this.result.basicCoverage =
        // eslint-disable-next-line @typescript-eslint/camelcase
        ((this.coverage_total || 0) / 1000) * real_day;
      this.result.coverageTotal = this.coverage_total;
      total += premiumCoverage + this.result.basicCoverage;
    }

    if (includeFee) {
      this.result.serviceFee =
        this.result.forDicount * RIDER_TAX * VAT_TAX +
        this.result.forDicount * RIDER_TAX;
      total += this.result.serviceFee;
    }
    total += this.result.subtotal;
    this.result.subtotalDiscounted =
      // eslint-disable-next-line @typescript-eslint/camelcase
      ((this.result.count * parseInt(this.daily)) / 100) * real_day;
    total -= this.result.subtotalDiscounted;
    this.result.total = total;
  }

  test(e: any) {
    const value = e.inst.getVal();
    const date = moment(new Date(value[0])).format('YYYY-MM-DD');
    const duration =
      moment(new Date(value[0])).diff(new Date(value[1]), 'seconds') * -1;
    this.setCalendarCounts(duration);
    this.setData.emit({
      duration,
      date,
      result: this.result,
    });
  }

  refresh() {
    typeof this.mbscRange.refresh === 'function' && this.mbscRange.refresh();
  }

  // eslint-disable-next-line
  setSvg(e) {
    const el = document.createElement('div');
    el.classList.add('arrow-right');
    e.inst.element.insertBefore(el, e.inst.element.children[1]);
  }
}
