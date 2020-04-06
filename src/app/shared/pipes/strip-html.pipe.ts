import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strip_html',
})
export class StripHtmlPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: any): any {
    if (value === null || value === '') {
      return '';
    }
    return value.replace(/<(?:.|\n)*?>/gm, ' ');
  }
}
