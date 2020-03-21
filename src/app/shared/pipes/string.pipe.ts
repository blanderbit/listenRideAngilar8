import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringPipe' })
export class StringPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: string): string {
    return value || 'N/A';
  }
}
