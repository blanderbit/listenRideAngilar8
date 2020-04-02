import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { ExpandedBikeData } from '@models/bike/bike.types';
import { EngagedDays, EngagedHoursByDay } from '@api/api-rides/types';
import { ApiRidesService } from '@api/api-rides/api-rides.service';
import mergeWith from 'lodash-es/mergeWith';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { Observable, combineLatest, Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material';
import { DATE_FORMAT, YEAR_MONTH_FORMAT } from '@core/constants/time';
import {
  first,
  pairwise,
  startWith,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { User } from '@models/user/user';
import * as moment from 'moment';
import {
  BookingSubmit,
  DatesRange,
  HalfDaysData,
  HourPickerOption,
} from './types';
import {
  checkIsBikeLoaded,
  customizer,
  getAvailableHalfDays,
  getAvailableToReturnHours,
  getDayHalvesData,
  getInitialHourPickerOptions,
} from './helpers';
import * as fromBike from '../store';
import { BikeState, BookingData, HourTypes } from '../types';
import {
  setBikeFromVariations,
  setSelectedDates,
  setSelectedHours,
} from '../store/actions';

@Component({
  selector: 'lnr-bike-booking-widget',
  templateUrl: './bike-booking-widget.component.html',
  styleUrls: ['./bike-booking-widget.component.scss'],
})
export class BikeBookingWidgetComponent implements OnInit, OnDestroy {
  @Input() isPricesSectionShown: boolean;

  @Input() buttonText: string;

  @Input() isButtonDisabled: boolean;

  @Output() submitEvent = new EventEmitter<BookingSubmit>();

  public currentBike$: Observable<ExpandedBikeData>;

  public unavailableDates: EngagedDays;

  public unavailableHours: EngagedHoursByDay = {};

  public selectedDays$: Observable<DatesRange>;

  public dayHalvesData: HalfDaysData = {};

  public hourPickerOptions: Array<HourPickerOption> = [];

  public isTimePickerShown: boolean;

  public bikeData$: Observable<BikeState>;

  public bookingData$: Observable<BookingData>;

  public isSubmitButtonDisabled: boolean;

  public shownErrors: Array<string>;

  // The simplest way to preserve original key-value order in ng-template
  public preserveOrder = (): 1 => 1;

  private user$: Observable<Partial<User>>;

  public hourTypes = HourTypes;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private availableMonths: Array<string>;

  constructor(
    private apiRidesService: ApiRidesService,
    private authStore: Store<fromAuth.State>,
    private bikeStore: Store<BikeState>,
  ) {
    this.hourPickerOptions = getInitialHourPickerOptions();
    this.currentBike$ = bikeStore.select(fromBike.selectCurrentBikeData);
    this.selectedDays$ = bikeStore.select(fromBike.selectBookingDays);
    this.bookingData$ = bikeStore.select(fromBike.selectBookingData);
    this.bikeData$ = bikeStore.select(fromBike.selectBikeState);
    this.user$ = authStore.select(fromAuth.selectUser);
  }

  ngOnInit(): void {
    combineLatest(this.bookingData$, this.user$)
      .pipe(withLatestFrom(this.currentBike$), takeUntil(this.destroy$))
      .subscribe(([[bookingData, user], bikeData]) => {
        this.processSelectedDaysChange(bookingData, bikeData);
        this.processBookingDataChange(bookingData, bikeData);
        this.checkIsBookingAvailable(bookingData, bikeData, user);
      });

    this.currentBike$
      .pipe(startWith(null), pairwise(), takeUntil(this.destroy$))
      .subscribe(async ([prevBikeData, bikeData]) => {
        this.processBikeDataChange(bikeData, prevBikeData);
      });
  }

  async processBikeDataChange(
    bikeData: ExpandedBikeData,
    prevBikeData: ExpandedBikeData,
  ): Promise<void> {
    if (bikeData && !checkIsBikeLoaded(bikeData.id, prevBikeData)) {
      const today = moment();
      const nextMonthEnd = moment()
        .add(1, 'month')
        .endOf('month');

      this.availableMonths = [];
      this.unavailableDates = undefined;
      this.unavailableHours = {};
      await this.getUnavailableTimeData(today, nextMonthEnd);
      const bookingData = await this.bookingData$.pipe(first()).toPromise();
      const userData = await this.user$.pipe(first()).toPromise();
      this.processSelectedDaysChange(bookingData, bikeData);
      this.processBookingDataChange(bookingData, bikeData);
      this.checkIsBookingAvailable(bookingData, bikeData, userData);
    }
  }

  processSelectedDaysChange(
    { startDay, endDay }: BookingData,
    bikeData?: ExpandedBikeData,
  ): void {
    if (!startDay || !endDay) {
      return;
    }
    this.isTimePickerShown = true;
    this.hourPickerOptions = getInitialHourPickerOptions();

    if (bikeData && bikeData.isHalfDay && startDay.isSame(endDay, 'day')) {
      const dateString = startDay.format(DATE_FORMAT);
      const dayHalves = getAvailableHalfDays(
        this.unavailableHours[dateString],
        bikeData.timeSlots,
      );

      if (dayHalves.length) {
        this.isTimePickerShown = false;
        this.dayHalvesData = getDayHalvesData(bikeData.timeSlots, dayHalves);
      }
    }
  }

  processBookingDataChange(booking: BookingData, bike: ExpandedBikeData): void {
    const { pickUpHour, returnHour, startDay = moment(), endDay } = booking;

    if (bike && bike.isHalfDay && startDay.isSame(endDay, 'day')) {
      Object.entries(this.dayHalvesData).forEach(([key, value]) => {
        if (value.startHour >= pickUpHour && value.endHour <= returnHour) {
          this.isTimePickerShown = false;
          this.dayHalvesData[key].isChecked = true;
        }
      });
    } else {
      this.dayHalvesData = {};
    }
  }

  onDatesRangeSet(range: DatesRange): void {
    this.bikeStore.dispatch(setSelectedDates(range));
  }

  public onNextMonthRequest = async (monthWithYear: string): Promise<void> => {
    if (!this.availableMonths.includes(monthWithYear)) {
      const currentMonth = moment(monthWithYear, YEAR_MONTH_FORMAT);
      await this.getUnavailableTimeData(currentMonth.startOf('month'));
    }

    const nextMonth = moment(monthWithYear, YEAR_MONTH_FORMAT).add(1, 'months');
    const nextMonthString = nextMonth.format(YEAR_MONTH_FORMAT);
    if (!this.availableMonths.includes(nextMonthString)) {
      this.getUnavailableTimeData(nextMonth.startOf('month'));
    }
  };

  async getUnavailableTimeData(
    startDate: moment.Moment,
    endDate?: moment.Moment,
  ): Promise<void> {
    const { id } = await this.currentBike$.pipe(first()).toPromise();
    const end = endDate || moment(startDate).endOf('month');
    const { days, hours } = await this.apiRidesService
      .getEngagedTimeData(
        id,
        startDate.format(DATE_FORMAT),
        end.format(DATE_FORMAT),
      )
      .toPromise();

    this.unavailableDates = mergeWith(this.unavailableDates, days, customizer);
    this.unavailableHours = mergeWith(this.unavailableHours, hours, customizer);
    [startDate, endDate].filter(Boolean).forEach(date => {
      const dateString = date.format(YEAR_MONTH_FORMAT);
      if (!this.availableMonths.includes(dateString)) {
        this.availableMonths.push(dateString);
      }
    });
  }

  async onSelectOpen(isOpened: boolean, hourType: HourTypes): Promise<void> {
    if (isOpened) {
      const { startDay, endDay, pickUpHour } = await this.bookingData$
        .pipe(first())
        .toPromise();
      const key = (hourType === HourTypes.PickUp ? startDay : endDay).format(
        DATE_FORMAT,
      );
      const { unavailable, closed } = this.unavailableHours[key];
      if (hourType === HourTypes.PickUp) {
        const unavailableHoursToStart = [...unavailable, ...closed];

        this.hourPickerOptions = this.hourPickerOptions.map(option => ({
          ...option,
          isDisabled: unavailableHoursToStart.includes(option.value),
        }));
      } else {
        const firstAvailableHour = startDay.isSame(endDay, 'day')
          ? pickUpHour
          : 0;
        const availableHours = getAvailableToReturnHours(
          unavailable,
          closed,
          firstAvailableHour,
        );

        this.hourPickerOptions = this.hourPickerOptions.map(option => ({
          ...option,
          isDisabled: !availableHours.includes(option.value),
        }));
      }
    }
  }

  async onSubmitButtonClick(): Promise<void> {
    const bookingData = await this.bikeStore
      .select(fromBike.selectBookingData)
      .pipe(first())
      .toPromise();
    const { startDay, endDay, pickUpHour, returnHour } = bookingData;
    const startDate = startDay
      .hour(pickUpHour)
      .startOf('hour')
      .toDate();
    const endDate = endDay
      .hour(returnHour)
      .startOf('hour')
      .toDate();

    this.submitEvent.emit({
      startDate,
      endDate,
    });
  }

  onSizeSelectionChange({ value: prettySize }: MatSelectChange): void {
    this.bikeStore.dispatch(setBikeFromVariations({ prettySize }));
  }

  onHourSelectChange({ value }: MatSelectChange, type: HourTypes): void {
    this.bikeStore.dispatch(
      setSelectedHours({
        ...(type === HourTypes.PickUp
          ? { pickUpHour: value }
          : { returnHour: value }),
      }),
    );
  }

  onHalfDayChange(): void {
    const [fistHalf, secondHalf] = Object.values(this.dayHalvesData)
      .filter(({ isChecked }) => isChecked)
      .sort((a, b) => a.startHour - b.startHour);
    const pickUpHour = (fistHalf && fistHalf.startHour) || null;
    const returnHour =
      (secondHalf && secondHalf.endHour) ||
      (fistHalf && fistHalf.endHour) ||
      null;

    this.bikeStore.dispatch(
      setSelectedHours({
        pickUpHour,
        returnHour,
      }),
    );
  }

  // TODO: Improve validations
  checkIsBookingAvailable(
    bookingData: BookingData,
    bikeData?: ExpandedBikeData,
    user?: Partial<User>,
  ): void {
    const { pickUpHour, returnHour, startDay, endDay } = bookingData;
    this.shownErrors = [];

    if (user && bikeData && bikeData.user.id === user.id) {
      this.shownErrors.push('calendar.own-bike');
    }
    if (startDay && pickUpHour && returnHour) {
      const start = startDay.hour(pickUpHour);
      const end = endDay.hour(returnHour);
      const startString = start.format(DATE_FORMAT);
      const endString = end.format(DATE_FORMAT);

      if (start.isBefore(moment(), 'd') || end.isBefore(start)) {
        this.shownErrors.push('calendar.invalid-date');
      } else if (this.unavailableDates) {
        const { closed, booked, unavailable } = this.unavailableDates;

        if (
          Object.values({ closed, booked, unavailable }).some(
            d => d.includes(startString) || d.includes(endString),
          )
        ) {
          this.shownErrors.push('calendar.invalid-date');
        }
      } else if (this.unavailableHours) {
        if (
          Object.values(this.unavailableHours[startString] || {}).some(d =>
            d.includes(pickUpHour),
          ) ||
          Object.values(this.unavailableHours[endString] || {}).some(d =>
            d.includes(returnHour),
          )
        ) {
          this.shownErrors.push('calendar.invalid-date');
        }
      }
    }
    this.isSubmitButtonDisabled =
      this.isButtonDisabled ||
      pickUpHour === undefined ||
      returnHour === undefined ||
      !!this.shownErrors.length;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
