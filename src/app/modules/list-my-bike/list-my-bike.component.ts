import {
  AfterViewInit,
  Component,
  Inject,
  OnInit, ViewChild
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
import {BIKE, Variations} from '@models/bike/bike.model';
import {Subject} from 'rxjs';
import {filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

declare const google: any;
declare var require;

@Component({
  selector: 'lnr-list-my-bike',
  templateUrl: './list-my-bike.component.html',
  styleUrls: ['./list-my-bike.component.scss']
})

export class ListMyBikeComponent implements OnInit, AfterViewInit {
  isLinear = false;
  categoryFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  picturesFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  pricingFormGroup: FormGroup;
  bikeCategoryList: Array<CategoryInterface> = typeList;
  sizeList: Array<SizeListInterface> = sizeList;
  loadedPhoto: Array<LoadedImageInterface> = [];
  images: Array<LoadedImageInterface> = [];
  subCategoriesValue: Array<SubCategoryInterface> | null = [];
  user: Store<fromAuth.State> | any;
  userId: Store<fromAuth.State> | any;
  accessories: AccessoriesInterface | any = new AccessoriesInterface();
  accessoriesImage: AccessoriesImageInterface | any = new AccessoriesImageInterface();
  accessoriesArrList: Array<string> = [];
  customisedPricing = false;
  bikeQuantity: any = [{}];
  listPrices: Array<number> = [1000, 2000, 3000, 4000, 5000, 6000];
  priceCount = [1, 2, 3, 4, 5, 6, 7];
  deleted = [];
  arrVariable: Array<string> = ['categoryFormGroup', 'detailsFormGroup', 'locationFormGroup'];
  private destroyed$ = new Subject();
  data: BIKE | any;
  editData: any;

  @ViewChild('address', {static: true}) address: any;
  @ViewChild('cities', {static: true}) cities: any;
  @ViewChild('regionsZip', {static: true}) regionsZip: any;
  @ViewChild('regionsCountry', {static: true}) regionsCountry: any;


  /*
    conversations object Accessory keys to array and get this array
  */
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
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute
  ) {

    this.accessoriesARrr = this.accessories;
    this.setSvgImageToMat();

  }

  /*
    set svg image to material
  */
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

  /*
    clear unnecessary characters
  */
  getClearName (key: string): string {
    return key ? key
        .replace('./', '')
        .replace('.svg', '')
      : '';
  }

  /*
    get really path for svg image in root folder
  */
  getUrlSvg = (name: string): string => name ? `../../../assets/img-accessories/${name}.svg` : '';

  /*
   get string background image for dropdown
  */
  getUrlBackground = (value: any): string => value && value.src ? `url(${value.src}) 9px 3px no-repeat` : '';

  /*
    set default value to controls
  */
  ngOnInit(): void {

    this.activateRoute.data.pipe(
      map(({user, edit}) => {
        user ? this.userId = user.id : false;
        edit ? this.editData = true : false;
        return edit;
      }),
      takeUntil(this.destroyed$)
    )
      .subscribe(
        next => {
          this.data = next || new BIKE();
          this.setDataToPage()
        },
        () => this.snackBar('we have same error')
      );

    console.log(this.data)


  }

  setDataToPage = () => {
    let editSubcategory;

    let editCategory = this.bikeCategoryList
      .find(i => editSubcategory = i.categories
        .find(v => v.value == this.data.category)
      );


    this.accessories = this.data.accessories;

    this.subCategoriesValue = (editCategory && editCategory.categories) || [];

    const category = {
      category: [editCategory, Validators.required],
      subCategory: [editSubcategory || '', Validators.required]
    };

    const detailsCtrl = {
      available: [true],
      size: [this.data.size ? this.data.size : '', Validators.required],
      frame_size: [this.data.frame_size === "null" ? '' : this.data.frame_size],
      bicycle_number: [this.data.bicycle_number || ''],
      frame_number: [this.data.frame_number || ''],
      brand: [this.data.brand || '', Validators.required],
      name: [this.data.name || '', Validators.required],
      description: [this.data.description || '', [Validators.minLength(100), Validators.required]],
    };

    this.data.images && Array.isArray(this.data.images) && this.data.images.forEach(i => this.images.push({
      isMain: i.is_primary,
      url: i.original,
      file: null
    }));

    const picturesCtrl = {
      picturesCtrl_0: ['', Validators.required]
    };

    const locationCtrl = {
      street: [this.data.street ? this.data.street : ''],
      zip: [this.data.zip ? this.data.zip : ''],
      city: [this.data.city ? this.data.city : ''],
      country: [this.data.country ? this.data.country : ''],
      custom_price: [this.data.coverage_total ? this.data.coverage_total : '', Validators.required],
    };

    const pricingCtrl = {
      daily: [this.data.discounts.daily, Validators.required],
      weekly: [this.data.discounts.weekly, Validators.required],
      price: [this.data.daily_price, Validators.required],
    };

    this.categoryFormGroup = this.formBuilder.group(category);
    this.detailsFormGroup = this.formBuilder.group(detailsCtrl);
    this.picturesFormGroup = this.formBuilder.group(picturesCtrl);
    this.locationFormGroup = this.formBuilder.group(locationCtrl);
    this.pricingFormGroup = this.formBuilder.group(pricingCtrl);
  }

  /*
    change Category value and set sub category value
  */
  changeCategory = (e: any): void => {
    this.categoryFormGroup.controls.subCategory.setValue('');
    this.subCategoriesValue = e.value.categories;
  };

  /*
    converting an unreadable picture file to a normal state for display
  */
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

  /*
    remove one photo object from array
  */
  removePhoto = (i: number, type): void => {
    if(type === 'image') {
      const data = this[type].splice(i, 1);
      this.deleted.push(data.id)
    }
    if(type === 'loadedPhoto') {
      this[type].splice(i, 1);
    }
  };

  /*
    create bike
  */
  request(isEdit?: any): void {
    const data = new FormData();
    // get value from all controls
    this.arrVariable.forEach(name => {
      if (!this[name] && this[name].controls) {
        return false;
      }
      const controls = this[name].controls;
      const variable = typeof controls === 'object' ? Object.keys(controls) : [];
      variable.forEach(nameControl => {
        const value = controls[nameControl].value;
        if (value || typeof value === 'number') {
          if (nameControl !== 'category' && nameControl !== 'subCategory') {
            data.append(`ride[${nameControl}]`, controls[nameControl].value);
          }
          this.data[nameControl] = controls[nameControl].value;
        }
      });
    });

    // we put only filled objects
    // this.data.accessories = JSON.stringify(this.accessories);
    data.append('ride[accessories]', JSON.stringify(this.accessories));
    this.data.variations = [...this.bikeQuantity].filter(({available}) => typeof available === 'boolean');

    // we have specific dropdown value which set number value,
    // but array[] with data for dropdown have 'Unisize = 0', if we select 'Unisize' we can’t validate the formGroup
    // in order to get around this concept, the value of this dropdown option is its
    // name, and here we put the desired parameter
    this.data.variations = this.data.variations.map(item => {
      if (item.size === 'Unisize') {
        item.size = 0;
      }
      return item;
    });
    this.data.variations.forEach((item, index) => {
      Object.keys(item).forEach(key => data.append(`ride[variations][${index}]`, item[key]))
    });
    // get value from control prices
    this.priceCount.forEach(i => {
      const name = `price${i}`;
      const control = this.pricingFormGroup.controls[name];
      if (control) {
        this.data.prices.splice(i, 0, control.value);
      }
    });
    Array.isArray(this.data.prices) && this.data.prices.length > 0 ? this.data.prices.forEach((i, index) => {
      data.append(`ride[prices][${index}]price`, i);
    }): data.append(`ride[prices]`,'[]');

    // get value from controls
    this.data.discounts.daily = this.pricingFormGroup.controls.daily.value;
    this.data.discounts.weekly = this.pricingFormGroup.controls.weekly.value;
    this.data.price = this.pricingFormGroup.controls.price.value;
    this.data.category = this.data.subCategory.value;
    delete this.data.subCategory;
    data.append('ride[category]', this.data.category);
    data.append('ride[price]', this.data.price);
    data.append('ride[discounts]', JSON.stringify(this.data.discounts));
    // const data = JSON.parse(JSON.stringify(this.data));
    const user = this.userId;
    data.append('ride[user_id]', user);
    // set image in form data and add to property
    data.append('images_to_remove', JSON.stringify(this.deleted))
    this.loadedPhoto
      .forEach(({isMain, file}, index) => {
        if (!file) {
          return false;
        }
        data.append(`ride[new_images][${index}]is_primary`, `${isMain}`);
        data.append(`ride[new_images][${index}]file`, file);
        data.append(`ride[new_images][${index}]position`, `${index++}`);
      });


    // receiving user from store and sending


    (isEdit ? this.apiRidesService.updateBike(this.data.id, data) : this.apiRidesService.createBike(data))
      .subscribe(
        () => {
          this.snackBar(isEdit ? 'Updated successfully' : 'Created successfully', false);
          this.router.navigate(['/my-bikes']);
        },
        ({error}) => {
          const errorFirst = error.errors[0];
          if (errorFirst) {
            this.snackBar(errorFirst.detail, false);
          }
        },
      );
  }

  /*
    clear all active observables
  */
  destroyed(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /*
    adding controllers for the form when activating the checkbox in formGroup
  */
  setCustomize({checked}: any) {
    this.customisedPricing = checked;
    this.priceCount.forEach(i => {
      const name = `price${i}`;
      checked
        ? this.pricingFormGroup.addControl(name, new FormControl('', Validators.required))
        : this.pricingFormGroup.removeControl(name);
    });
  }

  /*
   add one object to array bikeQuantity
  */
  addVariants = (): undefined => this.bikeQuantity.push(new Variations());

  /*
     update one field of one object in the array bikeQuantity
  */
  changeData = ({target}: any, obj: Variations | object, key: string): undefined => obj[key] = target.value;

  /*
     check for filling the "size" field of one object in the array bikeQuantity
  */
  isRider = (): boolean => {
    const arr = [...this.bikeQuantity];
    return arr.every((item) => item && item.size);
  };

  /*
     delete one variation from array
  */
  delQuantity = (index): object => this.bikeQuantity.splice(index, 1);

  /*
     initialize google Autocomplete
  */
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  /*
    set google Autocomplete to field
  */
  private getPlaceAutocomplete = (): void => {
    if (!this.address || !this.cities || !this.regionsCountry || !this.regionsZip) {
      return;
    }
    new google.maps.places.Autocomplete(this.address.nativeElement, {types: ['address']});
    new google.maps.places.Autocomplete(this.cities.nativeElement, {types: ['(cities)']});
    new google.maps.places.Autocomplete(this.regionsCountry.nativeElement, {types: ['(regions)']});
    new google.maps.places.Autocomplete(this.regionsZip.nativeElement, {types: ['(regions)']});
  };

  snackBar = (val: string, isGood = false): any => this._snackBar.open(val, 'Undo', {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: [(!isGood ? 'red-snackbar' : 'green-snackbar')]
  });

}
