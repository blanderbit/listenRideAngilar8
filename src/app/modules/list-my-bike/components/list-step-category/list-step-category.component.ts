import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessoriesInterface } from '../../model/models';

@Component({
  selector: 'lnr-list-step-category',
  templateUrl: './list-step-category.component.html',
  styleUrls: ['./list-step-category.component.scss'],
})
export class ListStepCategoryComponent {
  @Input() categoryFormGroup: FormGroup;

  @Input() categoryList;

  @Input() subCategoryList;

  @Input() accessoriesArrList: Array<string>;

  @Input() accessories: AccessoriesInterface;

  getUrlBackground = (value: any): string =>
    value && value.src ? `url(${value.src}) 9px 7px no-repeat` : '';

  changeCategory(e: any): void {
    this.categoryFormGroup.controls.subCategory.setValue('');
    this.subCategoryList = e.value.categories;
  }
}
