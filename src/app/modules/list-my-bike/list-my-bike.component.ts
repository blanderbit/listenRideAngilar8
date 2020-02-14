import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  select,
  Store
} from '@ngrx/store';

import {
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  typeList,
  sizeList
} from '@core/constants/filters.const';
import {DOCUMENT} from '@angular/common';
import * as fromAuth from '@auth/store/reducers';
import {
  AccessoriesImageInterface,
  AccessoriesInterface,
  CategoryInterface,
  LoadedImageInterface,
  SizeListInterface,
  SubCategoryInterface
} from './model/models';
import {DomSanitizer} from '@angular/platform-browser';

import {MatIconRegistry} from '@angular/material/icon';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {BIKE, Variations} from "@models/bike/bike.model";
import {Subject} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";

declare var require;

@Component({
  selector: 'lnr-list-my-bike',
  templateUrl: './list-my-bike.component.html',
  styleUrls: ['./list-my-bike.component.scss']
})

export class ListMyBikeComponent implements OnInit {
  isLinear = false;
  categoryFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  picturesFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  pricingFormGroup: FormGroup;
  bikeCategoryList: Array<CategoryInterface> = typeList;
  sizeList: Array<SizeListInterface> = sizeList;
  loadedPhoto: Array<LoadedImageInterface> = [];
  subCategoriesValue: Array<SubCategoryInterface> | null = [];
  user: Store<fromAuth.State> | any;
  hide = true;
  accessories: AccessoriesInterface | any = new AccessoriesInterface();
  accessoriesImage: AccessoriesImageInterface | any = new AccessoriesImageInterface();
  accessoriesArrList: Array<string> = [];
  customisedPricing = false;
  bikeQuantity: any = [{}];
  listPrices: Array<number> = [1000, 2000, 3000, 4000, 5000, 6000];
  priceCount = [1, 2, 3, 4, 5, 6, 7];
  private destroyed$ = new Subject();

  get accessoriesARrr() {
    return (this.accessoriesArrList || []);
  }

  set accessoriesARrr(value) {
    this.accessoriesArrList = Object.keys(value);
  }

  constructor(
    private store: Store<fromAuth.State>,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private apiRidesService: ApiRidesService,
    private router: Router
  ) {
    this.accessoriesARrr = this.accessories;
    this.setSvgImageToMat();
    this.user = this.store.pipe(
      select(fromAuth.selectAuthGetUser),
      takeUntil(this.destroyed$)
    );
  }

  setSvgImageToMat(): void {
    const images = require.context('../../../assets/img-accessories', true, /\.(png|jpg|jpeg|svg)$/);
    images
      .keys()
      .forEach((key: string): void => {
        const name = this.getClearName(key);
        this.matIconRegistry
          .addSvgIcon(
            `lnr-${name}`,
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.getUrlSvg(name))
          );
      });
  }

  getClearName = (key: string): string => {
    return key ? key
        .replace('./', '')
        .replace('.svg', '')
      : '';
  };

  getUrlSvg = (name: string): string => name ? `../../../assets/img-accessories/${name}.svg` : '';

  getUrlBackground = (value: any): string => value && value.src ? `url(${value.src}) 9px 3px no-repeat` : '';

  ngOnInit(): void {

    const category = {
      category: ['', Validators.required],
      subCategory: ['', Validators.required]
    };
    const detailsCtrl = {
      available: [true],
      size: ['', Validators.required],
      frame_size: [''],
      bicycle_number: [''],
      frame_number: [''],
      brand: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', [Validators.minLength(100), Validators.required]],
    };
    const picturesCtrl = {
      picturesCtrl_0: ['', Validators.required]
    };
    const locationCtrl = {
      street: [''],
      zip: [''],
      city: [''],
      country: [''],
      custom_price: ['', Validators.required],
    };
    const pricingCtrl = {
      daily: ['', Validators.required],
      weekly: ['', Validators.required],
      price: ['', Validators.required],
    };

    this.categoryFormGroup = this.formBuilder.group(category);
    this.detailsFormGroup = this.formBuilder.group(detailsCtrl);
    this.picturesFormGroup = this.formBuilder.group(picturesCtrl);
    this.locationFormGroup = this.formBuilder.group(locationCtrl);
    this.pricingFormGroup = this.formBuilder.group(pricingCtrl);
  }

  changeCategory = (e: any): void => {
    this.categoryFormGroup.controls.subCategory.setValue('');
    this.subCategoriesValue = e.value.categories;
  };

  previewFile(files: any): void {
    const arr = Array.from(files);
    arr.forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.loadedPhoto.push({
          isMain: false,
          file,
          url: reader.result
        });
      };
    });

  }

  removePhoto = (i: number): Object => this.loadedPhoto.splice(i, 1);

  create(): void {

    const data: BIKE | any = new BIKE();
    const arrVariable = ['categoryFormGroup', 'detailsFormGroup', 'locationFormGroup'];

    arrVariable.forEach(name => {
      if (!this[name] && this[name].controls) {
        return false;
      }
      const controls = this[name].controls;
      const variable = typeof controls === 'object' ? Object.keys(controls) : [];
      variable.forEach(nameControl => {
        const value = controls[nameControl].value;
        if (value || typeof value === 'number') {
          data[nameControl] = controls[nameControl].value
        }
      })
    });

    data.accessories = JSON.stringify(this.accessories);
    data.variations = [...this.bikeQuantity].filter(({available}) => typeof available === 'boolean');
    data.variations = data.variations.map(item => {
      if (item.size === 'Unisize') {
        item.size = 0;
      }
      return item;
    });
    this.priceCount.forEach(i => {
      const name = `price${i}`;
      const control = this.pricingFormGroup.controls[name];
      if (control) {
        data.prices.splice(i, 0, control.value)
      }
    });

    data.discounts.daily = this.pricingFormGroup.controls.daily.value;
    data.discounts.weekly = this.pricingFormGroup.controls.weekly.value;
    data.price = this.pricingFormGroup.controls.price.value;
    data.category = data.subCategory.value;
    delete data.subCategory;
    data.new_images = JSON.parse(JSON.stringify(this.loadedPhoto))
      .map(({isMain, file}, index) => {
        const form = new FormData();
        form.append('is_primary', isMain);
        form.append('file', file);
        form.append('position', index + 1);
        return form;
      });



    this.user.pipe(
      map((me: any) => {
        data.user_id = me.id;
        return data
      }),
      switchMap(switchData => this.apiRidesService.createBike(switchData))
    )
      .subscribe(() => {
          this.router.navigate(['/my-bikes']);
          this.destroyed();
        },
        () => {
          this.destroyed()
        },
        () => this.destroyed()
      )

  }

  destroyed(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setCustomize({checked}: any) {
    this.customisedPricing = checked;
    this.priceCount.forEach(i => {
      const name = `price${i}`;
      checked
        ? this.pricingFormGroup.addControl(name, new FormControl('', Validators.required))
        : this.pricingFormGroup.removeControl(name)
    });
  }

  addVariants = (): undefined => this.bikeQuantity.push(new Variations());

  changeData = ({target}, obj: Variations | Object, key:string): undefined => obj[key] = target.value;

  isRider = (): boolean => {
    const arr = [...this.bikeQuantity];
    arr.splice(0, 1);
    return arr.every(({size}) => size);
  };

  delQuantity = (index): Object => this.bikeQuantity.splice(index, 1);
}
