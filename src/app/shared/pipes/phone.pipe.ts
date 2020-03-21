import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  // TODO: add spaces
  // eslint-disable-next-line class-methods-use-this
  transform(value: string): string {
    return value ? `+${value}` : 'N/A';
  }
}
