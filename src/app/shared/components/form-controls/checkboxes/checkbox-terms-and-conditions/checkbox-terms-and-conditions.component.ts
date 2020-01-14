import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lnr-checkbox-terms-and-conditions',
  templateUrl: './checkbox-terms-and-conditions.component.html',
  styleUrls: ['./checkbox-terms-and-conditions.component.scss', '../checkbox.scss']
})
export class CheckboxTermsAndConditionsComponent {
  @Input() parentForm: FormGroup;
  @Input() parentFormGroupName: string;
  @Input() parentFormControlName: string;
}
