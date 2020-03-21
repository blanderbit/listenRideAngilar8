import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { getClearName } from '../../helpers/helpers';
import { AccessoriesInterface } from '../../model/models';

declare let require;

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

  getClearName = getClearName;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.setSvgImageToMat();
  }

  getUrlBackground = (value: any): string =>
    value && value.src ? `url(${value.src}) 9px 7px no-repeat` : '';

  setSvgImageToMat(): void {
    const images = require.context(
      '../../../../../assets/img-accessories',
      true,
      /\.(png|jpg|jpeg|svg)$/,
    );
    images.keys().forEach((key: string): void => {
      const name = this.getClearName(key);
      this.matIconRegistry.addSvgIcon(
        `lnr-${name}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.getUrlSvg(name)),
      );
    });
  }

  getUrlSvg = (name: string): string =>
    name ? `'../../../assets/img-accessories/${name}.svg` : '';

  changeCategory(e: any): void {
    this.categoryFormGroup.controls.subCategory.setValue('');
    this.subCategoryList = e.value.categories;
  }
}
