import { Pipe, PipeTransform } from '@angular/core';
import {
  formatCurrency,
  getCurrencySymbol,
  registerLocaleData,
} from '@angular/common';
import { ApiSeoService } from '@api/api-seo/api-seo.service';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@Pipe({
  name: 'lnr_currency',
})
export class CurrencyCustomPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(
    value: number,
    currencyCode: string = 'EUR',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '1.0',
    locale: string = 'de',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo,
    );
  }
}
