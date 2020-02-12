import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'phone'})
export class Phone implements PipeTransform {
  // TODO: add spaces
  transform(value: string): string {
    return value ? '+' + value : 'N/A';
  }
}
