import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
declare const require;

@Component({
  selector: 'lnr-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  @Input() paymentMethodFormGroup: FormGroup = this.formBuilder.group({
    payment: new FormControl(['']),
  });
  @Input('flowType') flowType: string; // request-flow settings
  @Input('mode') mode: 'view' | 'update';
  @Input('user') user;
  @Output('next') next = new EventEmitter();
  payment: any;
  paypal = require('../../../../../assets/images/payments/paypal.png');
  visa = require('../../../../../assets/images/payments/visa.png');
  mastercard = require('../../../../../assets/images/payments/mastercard.png');

  constructor(private formBuilder: FormBuilder) {}

  get currentPayment() {
    if (this.isCreditCard)
      return `**** **** **** ${this.user.paymentMethod.lastFour}`;
    if (this.isPayPal) return this.user.paymentMethod.email;
    return '';
  }

  get isCreditCard() {
    return this.getType === 'credit-card';
  }

  get isPayPal() {
    return this.getType === 'paypal-account';
  }

  get isPaymentRequestFlow() {
    return this.flowType === 'request-flow';
  }

  goToNext() {
    this.next.emit(true);
    this.mode = 'view';
    this.payment = '';
  }

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }

  get getType() {
    return (
      this.user &&
      this.user.paymentMethod &&
      this.user.paymentMethod.paymentType
    );
  }
}
