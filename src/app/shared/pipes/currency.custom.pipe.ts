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
  private locale: string;

  constructor(private apiSeoService: ApiSeoService) {
    this.locale = this.apiSeoService.retrieveLocale();
  }

  // eslint-disable-next-line class-methods-use-this
  transform(
    value: number,
    digitsInfo = '1.2-2',
    currencyCode = 'EUR',
    display = 'symbol',
    locale = this.locale,
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
