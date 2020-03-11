import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {typeList} from '@core/constants/filters.const';
import {DOCUMENT} from '@angular/common';
import * as fromAuth from '@auth/store/reducers';
import {
  AccessoriesInterface, CategoryInterface, LoadedImageInterface, SubCategoryInterface
} from './model/models';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {BIKE} from '@models/bike/bike.model';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { formsControlsName, arrCountriesCode} from './consts/consts';
import { priceCount} from '../../shared/helpers/price-helper';
import {getName, SetRound, templateMessage, numberValidate, reformatNumberDTC} from './helpers/helpers';
import {} from 'google-maps';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {DeviceDetectorService} from "ngx-device-detector";
import {log} from "util";


@Component({
  selector: 'lnr-list-my-bike',
  templateUrl: './list-my-bike.component.html',
  styleUrls: ['./list-my-bike.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true, displayDefaultIndicatorType: false}
  }]
})

export class ListMyBikeComponent implements OnInit {
    isLinear = false;
    categoryFormGroup: FormGroup;
    detailsFormGroup: FormGroup;
    picturesFormGroup: FormGroup;
    locationFormGroup: FormGroup;
    pricingFormGroup: FormGroup;
    bikeCategoryList: Array<CategoryInterface> = typeList;
    loadedPhoto: Array<LoadedImageInterface> = [];
    subCategoriesValue: Array<SubCategoryInterface> | null = [];
    userId: Store<fromAuth.State> | any;
    accessories: AccessoriesInterface | any = new AccessoriesInterface();
    accessoriesArrList: Array<string> = Object.keys(this.accessories) || [];
    customisedPricing = false;
    bikeQuantity: any = [{}];
    priceCount: Array<any | object> = priceCount;
    deleted: Array<number> = [];
    IsValidVariable : object = formsControlsName;
    data: BIKE | any;
    editData: any;
    street: string;
    zip: string | number;
    city: string;
    country: string;
    @Input() _hasCoverage = false;
    arrCountriesName: Array<string> = arrCountriesCode;
    isDesktop = true;
    isTablet = false;
    isMobile = false;

    getName = getName;
    SetRound = SetRound;
    templateMessage = templateMessage;
    numberValidate = numberValidate;
    reformatNumberDTC = reformatNumberDTC;

    private destroyed$ = new Subject();

    constructor(
        private store: Store<fromAuth.State>,
        private formBuilder: FormBuilder,
        @Inject(DOCUMENT) private document: Document,
        private apiRidesService: ApiRidesService,
        private router: Router,
        private SnackBar: MatSnackBar,
        private activateRoute: ActivatedRoute,
        private deviceDetectorService: DeviceDetectorService,
    ) {

    }

    ngOnInit(): void {
        this.activateRoute.data.pipe(
            map(({user, edit}) => {
                if (user) {
                    this.userId = user.id;
                    this.street = user.street;
                    this.zip = user.zip;
                    this.city = user.city;
                    this.country = user.country;
                }
                this.editData = !!edit;
                return edit;
            }),
            takeUntil(this.destroyed$)
        )
        .subscribe(
            next => {
                this.data = next || new BIKE();
                this.setDataToPage();
            },
            () => this.snackBar('we have some error')
        );

      this.isTablet = this.deviceDetectorService.isTablet();
      this.isMobile = this.deviceDetectorService.isMobile();
      this.isDesktop = this.deviceDetectorService.isDesktop();
      console.log(this.isTablet, this.isMobile, this.isDesktop);
    }

    setDataToPage(): void {

      let editSubcategory;

        const editCategory = this.bikeCategoryList
            .find(i => editSubcategory = i.categories
                .find(v => Number(v.value) === Number(this.data.category))
            );

        this.accessories = this.data.accessories;
        this.subCategoriesValue = (editCategory && editCategory.categories) || [];

        const SubcategoryValue = editSubcategory || '';
        const sizeValue = this.data.size || (typeof this.data.size === 'number' ? 0 : '');
        const frameSizeValue = this.data.frame_size === 'null' || !this.data.frame_size ? '' : this.data.frame_size;
        const bicycleNumberValue = this.data.frame_size || '';
        const frameNumberValue = this.data.frame_number || '';
        const brandValue = this.data.brand || '';
        const nameValue = this.data.name || '';
        const descriptionValue = this.data.description || '';
        const streetValue = this.data.street || this.street || '';
        const zipValue = this.data.zip || this.zip || '';
        const cityValue = this.data.city || this.city || '';
        const countryValue = this.data.country || this.country || '';
        const dailyValue = this.data.discounts.daily || '10';
        const weeklyValue = this.data.discounts.weekly || '20';
        const dailyPriceValue = this.data.daily_price || '';
        const coverageTotalValue = this.data.coverage_total || '';


        if (this.data.images && Array.isArray(this.data.images)) {
            this.data.images.forEach(i => this.loadedPhoto.push({
                isMain: i.is_primary,
                url: i.original,
                file: null,
                id: i.id
            }));
        }

        const category = {
            category: [editCategory, Validators.required],
            subCategory: [SubcategoryValue, Validators.required]
        };

        const detailsCtrl = {
            size: [sizeValue, Validators.required],
            frame_size: [frameSizeValue],
            bicycle_number: [bicycleNumberValue],
            frame_number: [frameNumberValue],
            brand: [brandValue, Validators.required],
            name: [nameValue, Validators.required],
            description: [descriptionValue, [Validators.minLength(100), Validators.required]],
        };
        const hasPicture =  this.loadedPhoto.length > 0 ? 'true' : '';
        const picturesCtrl = {
            picturesCtrl_0: [hasPicture, Validators.required]
        };

        const locationCtrl: any = {
            street: [streetValue, Validators.required],
            zip: [zipValue, Validators.required],
            city: [cityValue, Validators.required],
            country: [countryValue, Validators.required],
        };

        this.checkCountry(this.data.country_code);
        this.hasCoverage && (locationCtrl.coverage_total = [coverageTotalValue, Validators.required]);

        const pricingCtrl = {
            daily: [dailyValue],
          weekly: [weeklyValue],
          price: [dailyPriceValue, Validators.required]
        };

        this.categoryFormGroup = this.formBuilder.group(category);
        this.detailsFormGroup = this.formBuilder.group(detailsCtrl);
        this.picturesFormGroup = this.formBuilder.group(picturesCtrl);
        this.locationFormGroup = this.formBuilder.group(locationCtrl);
        this.pricingFormGroup = this.formBuilder.group(pricingCtrl);

        this.priceCount.forEach(i => {
            this.pricingFormGroup.addControl(
                this.getName(i.count),
                new FormControl('', Validators.required)
            );
        });

        !this.editData ? this.setCustomizeReCount() : this.setCustomizeBasePrice(this.data.prices);
    }

    checkCountry(str: string): void {
        const find = this.arrCountriesName.includes(str && str.toLowerCase());
        this.hasCoverage = !!find;
    }

    checkFormValidation(isEdit?: boolean): void {
        const isValid = Object.keys(this.IsValidVariable).find((item: string) => {
            if(!this[item]){
                return false;
            }
            if(item === 'picturesFormGroup'){
                return this.loadedPhoto.length < 1
            }
            return this[item].invalid;
        });
        if(isValid){
            return this.snackBar(this.templateMessage(this.IsValidVariable[isValid]));
        }
        this.request(isEdit);
    }

    request(isEdit?: any): void {
        const data = new FormData();

        const virtualData: any = {};
        Object.keys(this.IsValidVariable).forEach(name => {
            if(name === 'picturesFormGroup' || name === 'pricingFormGroup'){
                return false;
            }
            if (!this[name] && this[name].controls) {
                return false;
            }
            const controls = this[name].controls;
            const variable = typeof controls === 'object' ? Object.keys(controls) : [];
            variable.forEach(nameControl => {

                const value = controls[nameControl].value;
                if (!(value || typeof value === 'number')) {
                    return;
                }

                if (nameControl !== 'category' && nameControl !== 'subCategory') {
                    data.append(`ride[${nameControl}]`, controls[nameControl].value);
                }

                virtualData[nameControl] = controls[nameControl].value;
            });
        });

        data.append('ride[accessories]', JSON.stringify(this.accessories));
        virtualData.variations = [...this.bikeQuantity].filter(({available}) => typeof available === 'boolean');

        virtualData.variations = virtualData.variations.map(item => {
            if (item.size === 'Unisize') {
                item.size = 0;
            }
            return item;
        });

        virtualData.variations.forEach((item, index) => {
            const arr = Object.keys(item);
            arr.forEach(key => data.append(`ride[variations][${index}][${key}]`, item[key]));
        });

        virtualData.prices = [];
        this.priceCount.forEach(i => {
            const control = this.pricingFormGroup.controls[this.getName(i.count)];
            if (control) {
                virtualData.prices.splice(i.count, 0, control.value);
            }
        });

        const daily = this.pricingFormGroup.controls.daily.value;
        const weekly = this.pricingFormGroup.controls.weekly.value;
        const price = this.pricingFormGroup.controls.price.value;

        data.append(`ride[prices][0][price]`, this.reformatNumberDTC(price.toString(), ','));
        data.append(`ride[prices][0][start_at]`, `0`);

        if (this.editData) {
            data.append(`ride[prices][0][id]`, this.data.prices[0].id);
        }

        const prices = virtualData.prices;
debugger
        if (Array.isArray(prices)) {
            prices.forEach((i, index) => {
                const mainIndex = index + 1;
                data.append(`ride[prices][${mainIndex}][price]`, this.reformatNumberDTC(i.toString(), ','));
                data.append(`ride[prices][${mainIndex}][start_at]`, `${this.priceCount[index].start_at}`);
                if (this.editData) {
                    data.append(`ride[prices][${mainIndex}][id]`, this.data.prices[mainIndex].id);
                }
            });
        }

        const category = virtualData.subCategory.value;
        const street = this.locationFormGroup.controls.street.value;
        const zip = this.locationFormGroup.controls.zip.value;
        const city = this.locationFormGroup.controls.city.value;
        const country = this.locationFormGroup.controls.country.value;
        const coverageTotal: string | any = this.locationFormGroup.controls.coverage_total;
        const coverageTotalValue = (coverageTotal && coverageTotal.value) || '';

        delete virtualData.subCategory;

        data.append('ride[location][street]', street);
        data.append('ride[location][zip]', zip);
        data.append('ride[location][city]', city);
        data.append('ride[location][country]', country);
        coverageTotalValue && data.append('ride[coverage_total]', coverageTotalValue);
        data.append('ride[category]', category);
        data.append('ride[discounts][daily]', daily);
        data.append('ride[discounts][weekly]', weekly);

        const user = this.userId;
        data.append('ride[user_id]', user);

        if (Array.isArray(this.deleted)) {
            this.deleted.forEach((item, index) => {
                data.append(`ride[images_to_remove][${index}]`, `${item}`)
            });
        }

        data.append('ride[custom_price]', `${this.customisedPricing}`);

        this.loadedPhoto
            .forEach(({isMain, file, id}, index) => {
                if (!file) {
                    return false;
                }
                if (id) {
                    data.append(`ride[images][${index}][id]`, `${id}`);
                } else {
                    data.append(`ride[new_images][${index}][file]`, file);
                }
                data.append(`ride[new_images][${index}][is_primary]`, `${isMain}`);
                data.append(`ride[new_images][${index}][position]`, `${index}`);
            });

        (isEdit ? this.apiRidesService.updateBike(this.data.id, data) : this.apiRidesService.createBike(data))
            .subscribe(
                () => {
                    this.snackBar(isEdit ? 'Updated successfully' : 'Created successfully', true);
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

    destroyed(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    setCustomize = ({checked}: any): undefined => this.customisedPricing = checked;

    setCustomizeReCount(): void {

        const base = parseInt(this.pricingFormGroup.controls.price.value) || 0;
        const weekly = this.pricingFormGroup.controls.weekly.value;
        const daily = this.pricingFormGroup.controls.daily.value;

        for (let day = 1; day <= 5; day++) {
            const value = daily > 1 ? this.SetRound(day + 1, base, daily) : Math.round((day + 1) * base);
            const control = this.pricingFormGroup.controls[this.getName(day)];
            if (control) {
                control.setValue(value);
            }
        }

        this.pricingFormGroup.controls[this.getName(6)]
            .setValue(this.SetRound(7, base, weekly || 0));
        this.pricingFormGroup.controls[this.getName(7)]
            .setValue(this.SetRound(1, base, weekly || 0));
        this.pricingFormGroup.controls[this.getName(8)]
            .setValue(this.SetRound(28, base, weekly || 0));
    }

    setCustomizeBasePrice(pricesData): void {
        if (Array.isArray(pricesData)) {
            pricesData.forEach((item, index) => {
                if (!index) {
                    return;
                }

                const name = this.getName(index);
                const control = this.pricingFormGroup.controls[name];

                if (control) {
                    const price = this.reformatNumberDTC(item.price , '.');
                    control.setValue(price);
                }
            });
        }
    }

    get hasCoverage() {
        return this._hasCoverage;
    }

    set hasCoverage(value) {
        this._hasCoverage = value;
        if(value) {
            this.locationFormGroup && this.locationFormGroup.addControl(
            'coverage_total',
            new FormControl('', Validators.required))
        } else {
            this.locationFormGroup &&
            this.locationFormGroup.controls.coverage_total &&
            this.locationFormGroup.removeControl('coverage_total');
        }
    }

    //changeCountry = (e: any): void => this.checkCountry(e.target.value);
  //
  //     checkCountry(str: string) {
  //       const find = this.arrCountriesName.includes(str);
  //       this.isCoverage = !!find;
  //     }

    snackBar = (val: string, isGood = false): any => this.SnackBar.open(val, 'Undo', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: [(!isGood ? 'red-snackbar' : 'green-snackbar')]
    });

    verifyNumberInput(event: any): void {
        event.target.value = this.numberValidate(event.target.value);
    }
}
