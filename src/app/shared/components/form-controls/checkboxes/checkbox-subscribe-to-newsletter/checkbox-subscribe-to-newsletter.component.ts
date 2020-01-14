import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lnr-checkbox-subscribe-to-newsletter',
  templateUrl: './checkbox-subscribe-to-newsletter.component.html',
  styleUrls: ['./checkbox-subscribe-to-newsletter.component.scss', '../checkbox.scss']
})
export class CheckboxSubscribeToNewsletterComponent {
  @Input() parentForm: FormGroup;
  @Input() parentFormGroupName: string;
  @Input() parentFormControlName: string;
}
