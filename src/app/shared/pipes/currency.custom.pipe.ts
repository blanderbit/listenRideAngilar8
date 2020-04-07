import { Pipe, PipeTransform } from '@angular/core';
import {
  formatCurrency,
  getCurrencySymbol,
  registerLocaleData,
} from '@angular/common';

import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de');

@Pipe({
  name: 'lnr_currency',
})
export class CurrencyCustomPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(
    value: number | string,
    digitsInfo = '1.2-2',
    currencyCode = 'EUR',
    // Locale is hard-coded to show currency symbol on the right side in any locale
    locale = 'de',
  ): string | null {
    return formatCurrency(
      typeof value === 'number' ? value : parseInt(value, 10),
      locale,
      getCurrencySymbol(currencyCode, 'narrow'),
      currencyCode,
      digitsInfo,
    );
  }
}
