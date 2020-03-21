import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {getPricesByDay, PricesByDay} from '@shared/helpers/price-helper';
import {ExpandedBikeData} from '@models/bike/bike.types';
import {EngagedHours, EngagedDays} from '@api/api-rides/types';
import * as moment from 'moment';
import {ApiSeoService} from '@api/api-seo/api-seo.service';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {
  getAbsentNumbers,
  getAvailableHalfDays,
  getIsHalfDay,
  customizer,
  getDayHalvesData,
  getInitialHourPickerOptions
} from './helpers';
import {DATE_FORMAT} from './constants';
import get from 'lodash-es/get';
import mergeWith from 'lodash-es/mergeWith';
import concat from 'lodash-es/concat';
import {DatesRange, HalfDay, HourPickerOption} from './types';
import {TimeSlots} from '@models/business/business';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';

@Component({
  selector: 'lnr-bike-booking-widget',
  templateUrl: './bike-booking-widget.component.html',
  styleUrls: ['./bike-booking-widget.component.scss']
})
export class BikeBookingWidgetComponent implements OnChanges {
  @Input() bikeData?: ExpandedBikeData;
  @Input() isPricesSectionShown: boolean;

  public prices: PricesByDay;
  public unavailableDates: EngagedDays;
  private unavailableHours: EngagedHours;
  public isHalfDay: boolean;
  public timeSlots: TimeSlots;

  public selectedDates: DatesRange;
  public dayHalves: Array<HalfDay>;
  public hourPickerOptions: Array<HourPickerOption> = [];
  public isTimePickerShown: boolean;
  private availableMonthsData: Array<string>;
  private startHour: number;
  private endHour: number;
  user$ = this.storeAuth.pipe(select(fromAuth.selectUser));

  constructor(
    private apiSeoService: ApiSeoService,
    private apiRidesService: ApiRidesService,
    private storeAuth: Store<fromAuth.State>
  ) {
    this.hourPickerOptions = getInitialHourPickerOptions();
  }

  ngOnChanges({bikeData}: SimpleChanges): void {
    const {currentValue: bike} = bikeData as {currentValue: ExpandedBikeData};

    if (bike) {
      const today = moment();
      const nextMonthEnd = moment()
        .add(1, 'month')
        .endOf('month');
      this.prices = getPricesByDay(bike.prices);
      this.isHalfDay = getIsHalfDay(bike);
      this.timeSlots = get(this.bikeData, 'user.business.timeSlots', []);
      this.getUnavailableTimeData(today, nextMonthEnd).then(() => {
        this.availableMonthsData = [today, nextMonthEnd].map(d =>
          d.format('YYYY-MM')
        );
      });
    }
  }

  onDatesRangeSet({startDate, endDate}: DatesRange) {
    this.dayHalves = [];
    this.isTimePickerShown = false;
    this.selectedDates = {startDate, endDate};
    this.hourPickerOptions = getInitialHourPickerOptions();
    this.startHour = undefined;
    this.endHour = undefined;

    if (!startDate || !endDate) {
      return;
    } else if (this.isHalfDay && startDate.isSame(endDate, 'day')) {
      const dateString = startDate.format(DATE_FORMAT);
      const dayHalves = getAvailableHalfDays(
        this.unavailableHours[dateString],
        this.timeSlots
      );

      this.dayHalves = getDayHalvesData(this.timeSlots, dayHalves);
      if (this.dayHalves.every(({isAvailable}) => !isAvailable)) {
        this.dayHalves = [];
        this.isTimePickerShown = true;
      }
    } else {
      this.isTimePickerShown = true;
    }
  }

  onNextMonthRequest = async (month: string): Promise<void> => {
    if (this.availableMonthsData.includes(month)) {
      return;
    } else {
      await this.getUnavailableTimeData(moment(month));
      this.availableMonthsData.push(month);
    }
  };

  async getUnavailableTimeData(
    startDate: moment.Moment,
    endDate?: moment.Moment
  ) {
    const end = endDate ? endDate : moment(startDate).endOf('month');
    const {id} = this.bikeData;
    const {days, hours} = await this.apiRidesService
      .getEngagedTimeData(
        id,
        startDate.format(DATE_FORMAT),
        end.format(DATE_FORMAT)
      )
      .toPromise();

    this.unavailableDates = mergeWith(this.unavailableDates, days, customizer);
    this.unavailableHours = mergeWith(this.unavailableHours, hours, customizer);
  }

  onSelectOpen(isOpened: boolean, side: 'start' | 'end') {
    if (isOpened) {
      if (side === 'start') {
        const {startDate} = this.selectedDates;
        const dateString = startDate.format(DATE_FORMAT);
        const {unavailable, closed} = this.unavailableHours[dateString];
        const unavailableHoursToStart = concat(unavailable, closed);

        this.hourPickerOptions.forEach(option => {
          option.isDisabled = unavailableHoursToStart.includes(option.value);
        });
      } else {
        const {endDate} = this.selectedDates;
        const dateString = endDate.format(DATE_FORMAT);
        const {unavailable, closed} = this.unavailableHours[dateString];
        const unavailableOnly = unavailable.filter(h => !closed.includes(h));
        const firstUnavailableToRange = Math.min(...unavailableOnly);
        const availableHours = getAbsentNumbers(closed).filter(
          n => n < firstUnavailableToRange
        );

        this.hourPickerOptions.forEach(option => {
          option.isDisabled = !availableHours.includes(option.value);
        });
      }
    }
  }
}
