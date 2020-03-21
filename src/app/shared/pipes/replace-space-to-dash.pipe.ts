import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpaceToDash',
})
export class ReplaceSpaceToDashPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: any, args?: any): any {
    return value.replace(/\s+/g, '-');
  }
}
