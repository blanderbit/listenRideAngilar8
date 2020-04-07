import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@models/user/user';
import { Availability } from './types';
import { hoursRange } from '../helpers/helpers';
import keys from 'lodash-es/keys';
import isEmpty from 'lodash-es/isEmpty';
import forEach from 'lodash-es/forEach';
import isEqual from 'lodash-es/isEqual';

@Component({
  selector: 'lnr-user-availability',
  templateUrl: './user-availability.component.html',
  styleUrls: ['./user-availability.component.scss'],
})
export class UserAvailabilityComponent implements OnInit {
  @Input() user: User;

  hours: { [key: string]: Array<Availability> } = {};
  weekDays: Array<string> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  hoursRange = hoursRange;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.cookHours();
    this.compactHours();
    this.compactDays();
  }

  cookHours() {
    forEach(this.weekDays, (day, index) => {
      const userAvl = this.user.openingHours.hours[index];
      let dayRange: Array<Availability> = [];

      if (isEmpty(userAvl)) {
        dayRange = [{ closed: true }];
      } else {
        forEach(userAvl, range => {
          dayRange.push({
            closed: false,
            startAt: range.startAt / 3600,
            endAt: (range.startAt + range.duration) / 3600,
          });
        });
      }
      this.hours[day] = dayRange;
    });
  }

  compactHours() {
    let dayName: string = '';
    let currentDay: Array<Availability> = [];
    let prevDay: Array<Availability> = [];
    let shortenHours: { [key: string]: Array<Availability> } = {};

    forEach(this.weekDays, (day, index) => {
      currentDay = this.hours[day];

      if (index !== 0 && isEqual(currentDay, prevDay)) {
        if (!isEmpty(shortenHours[dayName])) delete shortenHours[dayName];
        dayName = dayName + ', ' + this.translate.instant('shared.' + day);
        shortenHours[dayName] = currentDay;
      } else {
        dayName = this.translate.instant('shared.' + day);
        shortenHours[dayName] = currentDay;
        prevDay = currentDay;
      }
    });
    this.hours = shortenHours;
  }

  compactDays() {
    let ranges: Array<string> = [];
    let hours: { [key: string]: Array<Availability> } = {};

    forEach(keys(this.hours), daysRange => {
      let days: Array<string> = daysRange.split(', ');
      let rangeDays: string =
        days.length > 1 ? `${days[0]} - ${days[days.length - 1]}` : days[0];
      ranges.push(rangeDays);
      hours[rangeDays] = this.hours[daysRange];
    });
    this.weekDays = ranges;
    this.hours = hours;
  }
}
