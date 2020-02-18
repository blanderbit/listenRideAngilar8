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
        this.activateRoute.data.pipe(
            map(({user, edit}) => {
                user ? this.userId = user.id : false;
                edit ? this.editData = true : false;
                return edit;
            }),
            takeUntil(this.destroyed$)
        )
        .subscribe(next => {
            this.data = next ? next : new BIKE();
        }, () => this.data);

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
    getClearName = (key: string): string => {
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
    removePhoto = (i: number): object => this.loadedPhoto.splice(i, 1);

    /*
      create bike
    */
    request(isCreate?: any ): void {

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
                    this.data[nameControl] = controls[nameControl].value;
                }
            });
        });

        // we put only filled objects
        this.data.accessories = JSON.stringify(this.accessories);
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

        // get value from control prices
        this.priceCount.forEach(i => {
            const name = `price${i}`;
            const control = this.pricingFormGroup.controls[name];
            if (control) {
                this.data.prices.splice(i, 0, control.value);
            }
        });

        // get value from controls
        this.data.discounts.daily = this.pricingFormGroup.controls.daily.value;
        this.data.discounts.weekly = this.pricingFormGroup.controls.weekly.value;
        this.data.price = this.pricingFormGroup.controls.price.value;
        this.data.category = this.data.subCategory.value;
        delete this.data.subCategory;
        const data = JSON.parse(JSON.stringify(this.data));

        // set image in form data and add to property
        data.new_images = JSON.parse(JSON.stringify(this.loadedPhoto))
            .map(({isMain, file}, index) => {
                const form = new FormData();
                form.append('is_primary', isMain);
                form.append('file', file);
                form.append('position', index + 1);
                return form;
            });

        // receiving user from store and sending data
        data.user_id = this.userId;
            debugger;
        (isCreate ? this.apiRidesService.createBike(data) : this.apiRidesService.updateBike(this.editData, data))
        .subscribe(() => {
                if (isCreate) {
                    this.router.navigate(['/my-bikes']) ;
                }
                this.destroyed();
            },
            (err) => {
                this.snackBar(err);
                this.destroyed();
            },
            () => this.destroyed()
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
        debugger
        if (!this.address || !this.cities || !this.regionsCountry || !this.regionsZip) {
            return;
        }
        new google.maps.places.Autocomplete(this.address.nativeElement, {types: ['address']});
        new google.maps.places.Autocomplete(this.cities.nativeElement, {types: ['(cities)']});
        new google.maps.places.Autocomplete(this.regionsCountry.nativeElement, {types: ['(regions)']});
        new google.maps.places.Autocomplete(this.regionsZip.nativeElement, {types: ['(regions)']});
    };

    snackBar = (val: string): any => this._snackBar.open(val, 'Undo', {duration: 2000});

}
