import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stringPipe'})
export class StringPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value : 'N/A';
  }
}
