/* eslint-disable */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { environment } from '@environment/environment';
import { FormBuilder } from '@angular/forms';
import { AdyenCardOutput } from '@models/adien/adyen-card-output';

@Component({
  selector: 'lnr-payment-method-credit-card-adyen',
  templateUrl: './payment-method-credit-card-adyen.component.html',
  styleUrls: ['./payment-method-credit-card-adyen.component.scss'],
})
export class PaymentMethodCreditCardAdyenComponent implements AfterViewInit {
  @Output('onValid') onValidData = new EventEmitter();
  @Output('onError') onError = new EventEmitter();

  holderName = '';
  adyen = (window as any).AdyenCheckout;
  onLoad = true;
  data = null;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  changeHolderName(e) {
    if (
      e.target &&
      e.target.validity &&
      e.target.validity.valid &&
      this.data &&
      this.data.paymentMethod
    ) {
      this.onValid(this.data);
    } else {
      this.onError.emit({ holderName: 'Invalid field' });
    }
  }

  ngAfterViewInit(): void {
    this.initAdyenCheckout();
  }

  initAdyenCheckout() {
    const configuration = {
      locale: 'en_US',
      environment: 'test',
      originKey: environment.LNR_ADYEN_ORIGIN_KEY,
    };

    const checkout = new this.adyen(configuration);
    checkout
      .create('securedfields', {
        type: 'card',
        brands: ['mc', 'visa', 'amex', 'bcmc', 'maestro'],
        styles: {
          error: {
            color: '#ff445b',
          },
          validated: {
            color: '#5FC693',
          },
          placeholder: {
            color: '#d8d8d8',
          },
        },
        onLoad: () => {
          this.onLoad = false;
        },
        onValid: event => {
          this.data = event.data;
          this.onValid(event.data);
        },
        onError: event => {
          this.onError.emit(event);
          this.cdRef.detectChanges();
        },
      })
      .mount('#adien');
  }

  onValid(data: AdyenCardOutput) {
    data.paymentMethod.holderName = this.holderName;
    data.paymentMethod && data.paymentMethod.holderName
      ? this.onValidData.emit(data)
      : this.onError.emit(true);
  }
}
