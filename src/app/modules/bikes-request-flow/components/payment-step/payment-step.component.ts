import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'lnr-step-payment',
    templateUrl: './payment-step.component.html',
    styleUrls: ['./payment-step.component.scss'],
})
export class PaymentStepComponent {
  @Input() paymentMethodFormGroup: FormGroup;
}
