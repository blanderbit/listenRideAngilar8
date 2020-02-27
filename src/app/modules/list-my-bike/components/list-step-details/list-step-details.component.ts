import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Variations} from '@models/bike/bike.model';
import {SizeListInterface} from "../../model/models";
import {sizeList} from '@core/constants/filters.const';
@Component({
  selector: 'lnr-list-step-details',
  templateUrl: './list-step-details.component.html',
  styleUrls: ['./list-step-details.component.scss'],
})
export class ListStepDetailsComponent {
  @Input() detailsFormGroup: FormGroup;
  @Input() bikeQuantity;
  sizeList: Array<SizeListInterface> = sizeList;

  maxValue(e: any, brand: string) {
      const control = this.detailsFormGroup.controls[brand];
      const value = control.value;
      control.setValue(value.slice(0, 25));
  }

  addVariants = (): undefined => this.bikeQuantity.push(new Variations());

  changeData = ({target}: any, obj: Variations | object, key: string): undefined => obj[key] = target.value;

  isRider(): boolean {
      const arr = [...this.bikeQuantity];
      return arr.every((item) => item && item.size);
  }

  delQuantity = (index): object => this.bikeQuantity.splice(index, 1);
}

