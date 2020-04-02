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
import {
  EngagedDays,
  EngagedHours,
  EngagedHoursByDay,
} from '@api/api-rides/types';
import * as moment from 'moment';
import { TimeSlots } from '@models/business/business';
import { Debounce } from '@shared/decorators/debounce';
import range from 'lodash-es/range';
import { DATE_FORMAT, YEAR_MONTH_FORMAT } from '@core/constants/time';
import {
  getAvailableHalfDays,
  getAvailableHalfDayPrefix,
  getAbsentNumbers,
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

  @Input() engagedHours: EngagedHoursByDay;

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

  public isInvalidDate = (date): boolean => this.checkIsInvalidDate(date);

  public isCustomDate = (date): Array<string> | string =>
    this.applyCustomClassName(date);

  ngOnInit(): void {
    this.minDate = moment();
    if (this.engagedDays) {
      const { unavailable, booked, closed } = this.engagedDays;
      const flatInvalidDates = [...unavailable, ...booked, ...closed];
      const minDate = moment();

      while (flatInvalidDates.includes(minDate.format(DATE_FORMAT))) {
        minDate.add(1, 'day');
      }
      this.minDate = minDate;
      this.flatInvalidDates = flatInvalidDates;

      this.engagedDaysDiffer = this.kvDiffers.find(this.engagedDays).create();
    }
  }

  ngDoCheck(): void {
    if (this.engagedDaysDiffer) {
      const changes = this.engagedDaysDiffer.diff(this.engagedDays);
      if (changes) {
        const { unavailable, booked, closed } = this.engagedDays;

        this.flatInvalidDates = [...unavailable, ...booked, ...closed];
        if (this.pickerDirective) {
          this.pickerDirective.picker.updateCalendars();
        }
      }
    }
  }

  onStartDateChange(event): void {
    if (this.engagedDays) {
      const { startDate } = event as StartDateChangedEvent;
      const { unavailable, booked, partlyUnavailable } = this.engagedDays;
      const startDayString = startDate.format(DATE_FORMAT);

      if (this.pickerDirective.picker.isShown) {
        this.maxDate = [...booked, ...partlyUnavailable, ...unavailable]
          .sort()
          .reduce((result: moment.Moment | undefined, current) => {
            if (result) {
              return result;
            }
            if (current >= startDayString) {
              if (partlyUnavailable.includes(current)) {
                const engagedHours = this.engagedHours[current];
                const { unavailable: unavailableHours, closed } = engagedHours;

                if (current === startDayString) {
                  const reversedClosedHours = closed.sort((a, b) => b - a);
                  const closingHour = reversedClosedHours.reduce(
                    (res, curr) => {
                      return res - curr === 1 ? curr : res;
                    },
                  );
                  const lastUnavailableHour = Math.max(...unavailableHours);

                  if (range(lastUnavailableHour + 1, closingHour).length) {
                    return undefined; // Continue looping because this day is OK to start with
                  }
                }
                const firstUnavailableToRange = Math.min(...unavailableHours);
                const availableHours = getAbsentNumbers(closed).filter(
                  n => n < firstUnavailableToRange,
                );

                if (availableHours.length) {
                  return moment(current);
                }
              }
              return current > startDayString
                ? moment(current).subtract(1, 'day')
                : moment(current);
            }
            return undefined;
          }, undefined);
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
          this.engagedHours[dateString],
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
