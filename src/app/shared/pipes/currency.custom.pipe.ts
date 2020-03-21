import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { ApiSeoService } from '@api/api-seo/api-seo.service';

@Pipe({
  name: 'lnr_currency',
})
export class CurrencyCustomPipe implements PipeTransform {
  constructor(private apiSeoService: ApiSeoService) {}

  transform(
    value: number,
    currencyCode = 'EUR',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo = '1.0',
    locale?: string,
  ): string | null {
    return formatCurrency(
      value,
      locale || this.apiSeoService.retrieveLocale(),
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo,
    );
  }
}
