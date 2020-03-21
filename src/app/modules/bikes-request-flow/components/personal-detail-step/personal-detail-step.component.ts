import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lnr-step-personal-detail',
  templateUrl: './personal-detail-step.component.html',
  styleUrls: ['./personal-detail-step.component.scss'],
})
export class PersonalDetailStepComponent {
  @Input() personalDetailsFormGroup: FormGroup;
}
