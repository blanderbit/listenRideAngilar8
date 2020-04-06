import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  KeyValueDiffers,
  KeyValueDiffer,
  DoCheck,
} from '@angular/core';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { EngagedDays, EngagedHoursByDay } from '@api/api-rides/types';
import * as moment from 'moment';
import { TimeSlots } from '@models/business/business';
import { Debounce } from '@shared/decorators/debounce';
import { DATE_FORMAT, YEAR_MONTH_FORMAT } from '@core/constants/time';
import {
  getAvailableHalfDays,
  getAvailableHalfDayPrefix,
  isDayCanBeEndDate,
  isDayFullyAvailable,
} from '../../helpers';
import { CalendarValues, DatesRange, StartDateChangedEvent } from '../../types';

const NEXT_YEAR = moment().add(14, 'month');

@Component({
  selector: 'lnr-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent
  implements OnInit, AfterViewInit, DoCheck {
  constructor(private kvDiffers: KeyValueDiffers) {}

  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective: DaterangepickerDirective;

  @Input() datesRange: DatesRange;

  @Input() engagedDays: EngagedDays;

  @Input() engagedHoursByDay: EngagedHoursByDay;

  @Input() isHalfDay: boolean;

  @Input() timeSlots: TimeSlots;

  @Input() onNextMonthRequest: (month: string) => Promise<void>;

  @Output() datesRangeSet = new EventEmitter<DatesRange>();

  public localeOptions = {
    firstDay: 1,
    applyLabel: 'OK',
  };

  public minDate: moment.Moment;

  public maxDate: moment.Moment;

  private flatInvalidDates: Array<string> = [];

  private engagedDaysDiffer: KeyValueDiffer<string, Array<string>>;

  public isCalendarDataLoading: boolean;

  private unavailableToRangeDates: Array<string> = [];

  public isInvalidDate = (date): boolean => this.checkIsInvalidDate(date);

  public isCustomDate = (date): Array<string> | string =>
    this.applyCustomClassName(date);

  private startDateDiffer: KeyValueDiffer<string, any>;

  public selectedDays: DatesRange;

  ngOnInit(): void {
    this.minDate = moment();
    this.engagedDaysDiffer = this.kvDiffers.find({}).create();
    this.startDateDiffer = this.kvDiffers.find({}).create();
  }

  ngDoCheck(): void {
    const changes =
      this.engagedDaysDiffer && this.engagedDaysDiffer.diff(this.engagedDays);
    if (changes) {
      const {
        unavailable,
        booked,
        closed,
        partlyUnavailable,
      } = this.engagedDays;
      const flatInvalidDates = [...unavailable, ...booked, ...closed];

      this.unavailableToRangeDates = [
        ...new Set([...booked, ...partlyUnavailable, ...unavailable]),
      ].sort();
      while (flatInvalidDates.includes(this.minDate.format(DATE_FORMAT))) {
        this.minDate.add(1, 'day');
      }
      this.flatInvalidDates = flatInvalidDates;
      if (this.pickerDirective) {
        this.pickerDirective.picker.updateCalendars();
      }
    }
    const dateChanges = this.startDateDiffer.diff(this.datesRange);
    if (dateChanges && this.datesRange && this.datesRange.startDate.toDate) {
      const { startDate, endDate } = this.datesRange;

      this.selectedDays = {
        startDate: startDate.clone(),
        endDate: endDate.clone(),
      };
    }
  }

  onStartDateChange(event): void {
    if (this.engagedDays && this.pickerDirective.picker.isShown) {
      const { unavailableToRangeDates, engagedDays, engagedHoursByDay } = this;
      const { startDate } = event as StartDateChangedEvent;
      const { partlyUnavailable: partlyUnavailableDays } = engagedDays;
      const startDayString = startDate.format(DATE_FORMAT);

      if (
        partlyUnavailableDays.includes(startDayString) &&
        !isDayFullyAvailable(startDayString, engagedHoursByDay[startDayString])
      ) {
        this.maxDate = moment(startDayString);
      } else {
        const dates = unavailableToRangeDates.filter(d => d > startDayString);
        const [firstUnavailableToRangeDate] = dates;

        if (firstUnavailableToRangeDate) {
          this.maxDate = isDayCanBeEndDate(
            firstUnavailableToRangeDate,
            partlyUnavailableDays,
            engagedHoursByDay,
          )
            ? moment(firstUnavailableToRangeDate)
            : moment(firstUnavailableToRangeDate).subtract(1, 'day');
        } else {
          this.maxDate = NEXT_YEAR;
        }
      }
    }
  }

  @Debounce(300)
  onEndDate(event): void {
    if (event && event.startDate) {
      this.toggleDatepicker();
      this.datesRangeSet.emit(event);
      this.maxDate = NEXT_YEAR;
    }
  }

  checkIsInvalidDate(date: moment.Moment): boolean {
    return this.maxDate && date.isAfter(this.maxDate, 'day');
  }

  applyCustomClassName(date: moment.Moment): Array<string> | string {
    if (this.engagedDays) {
      const dateString = date.format(DATE_FORMAT);
      const { partlyUnavailable, unavailable, booked } = this.engagedDays;
      const fullyUnavailable = [...unavailable, ...booked];

      if (fullyUnavailable.includes(dateString)) {
        return ['fully-unavailable-day', 'off', 'disabled', 'invalid'];
      }
      if (this.flatInvalidDates.includes(dateString)) {
        return ['off', 'disabled', 'invalid'];
      }
      if (this.isHalfDay && partlyUnavailable.includes(dateString)) {
        const [availableHalfDay] = getAvailableHalfDays(
          this.engagedHoursByDay[dateString],
          this.timeSlots,
        );
        const prefix = getAvailableHalfDayPrefix(availableHalfDay);

        return prefix && `${prefix}-half-available`;
      }
    }
    return '';
  }

  toggleDatepicker(): void {
    this.pickerDirective.toggle();
  }

  ngAfterViewInit(): void {
    const { picker } = this.pickerDirective;
    const originalClickNext = picker.clickNext;
    const originalHide = picker.hide;

    if (this.engagedDays) {
      picker.clickNext = async side => {
        const { calendarVariables } = picker;
        const { left: currentCalendarValues } = calendarVariables;
        const { month, year } = currentCalendarValues as CalendarValues;
        const nexMonthNumber = month === 11 ? 0 : month + 1;
        const yearNumber = nexMonthNumber ? year : year + 1;
        const nextMonth = moment()
          .year(yearNumber)
          .month(nexMonthNumber); // January is the 0th, and we take next one

        this.isCalendarDataLoading = true;
        await this.onNextMonthRequest(nextMonth.format(YEAR_MONTH_FORMAT));
        this.isCalendarDataLoading = false;
        originalClickNext.apply(picker, [side]);
      };
    }
    picker.hide = () => {
      this.maxDate = NEXT_YEAR;
      originalHide.apply(picker);
    };
  }
}
