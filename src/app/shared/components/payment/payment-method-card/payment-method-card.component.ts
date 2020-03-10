import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from '@environment/environment';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PaymentCardFieldsEnum} from './payment-card-fields.enum';
import {MatFormField} from '@angular/material/form-field';
import {AdyenCardOutput} from '@models/adien/adyen-card-output';

@Component({
  selector: 'lnr-payment-method-card',
  templateUrl: './payment-method-card.component.html',
  styleUrls: ['./payment-method-card.component.scss'],
})
export class PaymentMethodCardComponent implements OnInit {
  @ViewChild('adyenDropin', {static: false}) adyenDropin: ElementRef;
  @ViewChild('numberInput', {static: false}) numberInput: MatFormField;
  @ViewChild('expDateInput', {static: false}) expDateInput: MatFormField;
  @ViewChild('cvcInput', {static: false}) cvcInput: MatFormField;

  @Output() valueValid = new EventEmitter<AdyenCardOutput>();
  @Output() valueInvalid = new EventEmitter<boolean>();

  holderNameControl = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(100)
  ]);

  cardNumberError: string;
  expDateError: string;
  cvcError: string;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initAdyenCheckout();
    }, 0);
  }

  initAdyenCheckout() {
    const configuration = {
      locale: 'en_US',
      environment: 'test',
      originKey: environment.LNR_ADYEN_ORIGIN_KEY,
    };

    const checkout = new (window as any).AdyenCheckout(configuration);

    checkout
      .create('securedfields', {
        type: 'card',
        styles: {
          error: {
            color: 'red'
          },
          validated: {
            color: 'green'
          },
          placeholder: {
            color: '#d8d8d8'
          }
        },
        onValid: (event) => {
          this.onValid(event.data);
        },
        onLoad() {
        },
        onConfigSuccess() {
        },
        onFieldValid: (event) => {
          this.onValidField(event.fieldType);
        },
        onError: (event) => {
          this.onErrorField(event.fieldType, event.i18n);
        },
        onFocus: (event) => {
          this.onFocusField(event.fieldType);
        },
      })
      .mount(this.adyenDropin.nativeElement);
  }

  onValid(data: AdyenCardOutput) {
    data.paymentMethod.holderName = this.holderNameControl.value;
    this.valueValid.emit(data);
  }

  onFocusField(fieldType: PaymentCardFieldsEnum) {
    if (fieldType === PaymentCardFieldsEnum.CARD_NUMBER) {
      this.focusField(this.numberInput);
    }
    if (fieldType === PaymentCardFieldsEnum.EXP_DATE) {
      this.focusField(this.expDateInput);
    }
    if (fieldType === PaymentCardFieldsEnum.CVC) {
      this.focusField(this.cvcInput);
    }
  }

  onValidField(fieldType: PaymentCardFieldsEnum) {
    if (fieldType === PaymentCardFieldsEnum.CARD_NUMBER) {
      this.validField(this.numberInput);
    }
    if (fieldType === PaymentCardFieldsEnum.EXP_DATE) {
      this.validField(this.expDateInput);
    }
    if (fieldType === PaymentCardFieldsEnum.CVC) {
      this.validField(this.cvcInput);
    }
  }

  onErrorField(fieldType: PaymentCardFieldsEnum, error: string) {

    this.valueInvalid.emit(true);

    if (fieldType === PaymentCardFieldsEnum.CARD_NUMBER) {
      this.cardNumberError = error;
      this.errorField(this.numberInput);
    }
    if (fieldType === PaymentCardFieldsEnum.EXP_DATE) {
      this.expDateError = error;
      this.errorField(this.expDateInput);
    }
    if (fieldType === PaymentCardFieldsEnum.CVC) {
      this.cvcError = error;
      this.errorField(this.cvcInput);
    }
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 0);
  }

  private focusField(matFormField: MatFormField) {
    matFormField._elementRef.nativeElement.classList.add('mat-focused');
    matFormField._elementRef.nativeElement.classList.add('mat-form-field-should-float');
  }

  private validField(matFormField: MatFormField) {
    matFormField._elementRef.nativeElement.classList.remove('ng-error');
    matFormField._elementRef.nativeElement.classList.remove('mat-form-field-invalid');
  }

  private errorField(matFormField: MatFormField) {
    matFormField._elementRef.nativeElement.classList.add('ng-error');
    matFormField._elementRef.nativeElement.classList.add('mat-form-field-invalid');
  }

}
