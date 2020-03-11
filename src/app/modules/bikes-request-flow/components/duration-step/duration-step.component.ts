import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SizeListInterface} from '../../../list-my-bike/model/models';
import {sizeList} from '@core/constants/filters.const';


@Component({
  selector: 'lnr-step-duration',
  templateUrl: './duration-step.component.html',
  styleUrls: ['./duration-step.component.scss'],
})
export class DurationStepComponent {
  @Input() durationFormGroup: FormGroup;
  sizeList: Array<SizeListInterface> = sizeList;
  @Input() hasInsurance: any;
}

