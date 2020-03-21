import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodEnum } from '@models/payment/payment-method.enum';
import { CreditCardValidator } from 'angular-cc-library';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-payment-method',
  templateUrl: './settings-payment-method.component.html',
  styleUrls: [
    '../settings-form.scss',
    './settings-payment-method.component.scss',
  ],
})
export class SettingsPaymentMethodComponent implements OnInit {
  form: FormGroup;

  mode: 'view' | 'update' = 'view';

  @Input() user: User;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.getForm();
  }

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }

  private getForm(): FormGroup {
    const formControls = {
      // TODO Fix all the esLint errors and warnings
      // eslint-disable-next-line @typescript-eslint/camelcase
      payment_type: [PaymentMethodEnum.CREDIT_CARD, Validators.required],
      type: ['scheme'],
      holderName: [],
      creditCard: [
        '',
        [CreditCardValidator.validateCCNumber as any, Validators.required],
      ],
      expDate: [
        '',
        [CreditCardValidator.validateExpDate as any, Validators.required],
      ],
      cvc: [
        '',
        [
          Validators.required as any,
          Validators.minLength(3) as any,
          Validators.maxLength(4) as any,
        ],
      ],
    };

    return this.fb.group({
      ...formControls,
    });
  }
}
