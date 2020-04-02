import {
  Component,
  Input,
  KeyValueDiffers,
  KeyValueDiffer,
  DoCheck,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  getDiscountedSubtotal,
  getServiceFee,
  PREMIUM_INSURANCE_PRICE,
  PricesByDay,
} from '@shared/helpers/price-helper';
import get from 'lodash-es/get';
import * as moment from 'moment';
import { Debounce } from '@shared/decorators/debounce';
import {
  DatesRange,
  HalfDaysData,
  BookingOverview,
  HalfDay,
} from '../../types';

interface TrackedDiffers {
  [key: string]: {
    differ: KeyValueDiffer<string, any>;
    value: HalfDay | moment.Moment;
  };
}

@Component({
  selector: 'lnr-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss'],
})
export class BookingOverviewComponent implements DoCheck, OnChanges {
  @Input() selectedDays: DatesRange;

  @Input() halfDaysData: HalfDaysData;

  @Input() pricesByDay: PricesByDay;

  @Input() isInsuranceEnabled: boolean;

  @Input() isPremiumInsuranceEnabled: boolean;

  @Input() insurancePrice: number;

  public bookingOverview: BookingOverview;

  private trackedDiffers: TrackedDiffers = {};

  constructor(private differs: KeyValueDiffers) {
    this.calculateOverviewData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const halfDaysData = get(changes, 'halfDaysData.currentValue', {});
    const selectedDays = get(changes, 'selectedDays.currentValue', {});

    Object.entries({ ...halfDaysData, ...selectedDays }).forEach(
      ([key, value]) => {
        this.trackedDiffers[key] = {
          differ: this.differs.find({}).create(),
          value,
        };
      },
    );
  }

  ngDoCheck(): void {
    const { trackedDiffers } = this;

    // Eslint disabled to break loop after first change (tiny optimisation)
    // eslint-disable-next-line no-restricted-syntax
    for (const { value, differ } of Object.values(trackedDiffers)) {
      const changes = differ.diff(value);

      if (changes) {
        this.calculateOverviewData();
        break;
      }
    }
  }

  @Debounce(500)
  calculateOverviewData(): void {
    const { selectedDays, pricesByDay } = this;

    if (!selectedDays || !selectedDays.startDate || !selectedDays.endDate) {
      this.bookingOverview = {
        daysAmount: 0,
        periodLabel: 'shared.days',
        price: pricesByDay[1],
        subtotal: 0,
      };
    } else {
      this.setDaysAmountAndSubtotal();
      this.setDiscountData();
      this.setTaxAndInsuranceData();
      this.setTotalData();
    }
  }

  setDaysAmountAndSubtotal(): void {
    const { selectedDays, halfDaysData, pricesByDay } = this;
    const { startDate, endDate } = selectedDays;
    const isHalfDay = Object.values(halfDaysData).some(h => h.isAvailable);
    const halvesChecked = Object.values(halfDaysData).filter(h => h.isChecked);
    const isHalfDayChecked = halvesChecked.length === 1;
    const dayAppendNeeded = isHalfDay ? !!halvesChecked.length : true;
    const daysAmount =
      endDate.diff(startDate, 'days') + Number(dayAppendNeeded);
    const price = isHalfDayChecked ? pricesByDay['1/2'] : pricesByDay[1];
    const subtotal = price * daysAmount;

    this.bookingOverview = {
      daysAmount,
      periodLabel: isHalfDayChecked ? 'shared.half-day' : 'shared.days',
      price,
      subtotal,
    };
  }

  setDiscountData(): void {
    const { pricesByDay, bookingOverview } = this;
    const { daysAmount, subtotal } = bookingOverview;
    const discountedSubtotal = getDiscountedSubtotal(daysAmount, pricesByDay);
    const discount =
      subtotal && daysAmount > 1 ? subtotal - discountedSubtotal : 0;
    const averageDiscount = discount ? discount / daysAmount : 0;

    this.bookingOverview = {
      ...bookingOverview,
      discountedSubtotal,
      discount,
      averageDiscount,
    };
  }

  setTaxAndInsuranceData(): void {
    const { isPremiumInsuranceEnabled, isInsuranceEnabled } = this;
    const { discountedSubtotal, daysAmount } = this.bookingOverview;
    const serviceFee = getServiceFee(discountedSubtotal);
    const insurancePrice =
      Number(!!isInsuranceEnabled) && this.insurancePrice / 1000;
    const insuranceTotal = daysAmount * insurancePrice;
    const premiumInsurancePrice =
      Number(!!isPremiumInsuranceEnabled) && PREMIUM_INSURANCE_PRICE;
    const premiumInsuranceTotal = daysAmount * premiumInsurancePrice;

    this.bookingOverview = {
      ...this.bookingOverview,
      serviceFee: insuranceTotal ? serviceFee + insuranceTotal : serviceFee,
      premiumInsurancePrice,
      insurancePrice,
      premiumInsuranceTotal,
    };
  }

  setTotalData(): void {
    const {
      discountedSubtotal,
      serviceFee,
      premiumInsuranceTotal,
    } = this.bookingOverview;

    this.bookingOverview.total =
      discountedSubtotal + serviceFee + premiumInsuranceTotal;
  }
}
