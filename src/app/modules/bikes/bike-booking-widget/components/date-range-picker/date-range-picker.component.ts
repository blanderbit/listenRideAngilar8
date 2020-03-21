// TODO Fix to avoid eslint-ignore (see below in file)
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
import { EngagedDays, EngagedHours } from '@api/api-rides/types';
import * as moment from 'moment';
import { TimeSlots } from '@models/business/business';
import { Debounce } from '@shared/decorators/debounce';
import range from 'lodash-es/range';
import { DATE_FORMAT } from '../../constants';
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

  @Input() engagedHours: EngagedHours;

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

  public isCustomDate = date => this.checkIsCustomDate(date);

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

  ngDoCheck() {
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

  onStartDateChange(event) {
    if (this.engagedDays) {
      const { startDate } = event as StartDateChangedEvent;
      const { unavailable, booked, partlyUnavailable } = this.engagedDays;
      const startDayString = startDate.format(DATE_FORMAT);

      if (this.pickerDirective.picker.isShown) {
        this.maxDate = [...booked, ...partlyUnavailable, ...unavailable]
          .sort()
          // eslint-disable-next-line array-callback-return,consistent-return
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
                    // eslint-disable-next-line consistent-return
                    return; // Continue looping because this day is OK to start with
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
          }, undefined);
      }
    }
  }

  @Debounce(300)
  onEndDate(event) {
    if (event && event.startDate) {
      const { startDate, endDate } = event as DatesRange;

      this.toggleDatepicker();
      this.datesRangeSet.emit({ startDate, endDate });
      this.maxDate = NEXT_YEAR;
    }
  }

  checkIsInvalidDate(date: moment.Moment) {
    return this.maxDate && date.isAfter(this.maxDate, 'day');
  }

  // eslint-disable-next-line consistent-return
  checkIsCustomDate(date: moment.Moment): Array<string> | string | void {
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
  }

  toggleDatepicker() {
    this.pickerDirective.toggle();
  }

  ngAfterViewInit() {
    const { picker } = this.pickerDirective;
    const originalClickNext = picker.clickNext;
    const originalHide = picker.hide;

    if (this.engagedDays) {
      picker.clickNext = async side => {
        const { calendarVariables } = picker;
        const { left: currentCalendarValues } = calendarVariables;
        const { month, year } = currentCalendarValues as CalendarValues;
        const nextMonth = String(month + 2).padStart(2, '0'); // January is the 0th

        this.isCalendarDataLoading = true;
        await this.onNextMonthRequest(`${year}-${nextMonth}`);
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
