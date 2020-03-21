// TODO Fix to avoid eslint-ignore (see below in file)
import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Variations } from '@models/bike/bike.model';
import { sizeList } from '@core/constants/filters.const';
import { SizeListInterface } from '../../model/models';
@Component({
  selector: 'lnr-list-step-details',
  templateUrl: './list-step-details.component.html',
  styleUrls: ['./list-step-details.component.scss'],
})
export class ListStepDetailsComponent implements AfterViewInit {
  @Input() detailsFormGroup: FormGroup;

  @Input() bikeQuantity;

  sizeList: Array<SizeListInterface> = sizeList;

  maxValue(e: any, brand: string) {
    const control = this.detailsFormGroup.controls[brand];
    const { value } = control;
    control.setValue(value.slice(0, 25));
  }

  addVariants = (): undefined => this.bikeQuantity.push(new Variations());

  // eslint-disable-next-line no-return-assign
  changeData = (
    { target }: any,
    obj: Variations | object,
    key: string,
    // eslint-disable-next-line no-param-reassign
  ): undefined => (obj[key] = target.value);

  isRider(): boolean {
    const arr = [...this.bikeQuantity];
    return arr.every(item => item && item.size);
  }

  delQuantity = (index): object => this.bikeQuantity.splice(index, 1);

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-unused-expressions
    this.detailsFormGroup.valid
      ? this.detailsFormGroup.touched
      : this.detailsFormGroup.untouched;
  }
}
