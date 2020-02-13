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
//import {BIKE} from './model/models';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {BIKE} from "@models/bike/bike.model";

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
    user: Store<fromAuth.State> | any = this.store.pipe(select(fromAuth.selectAuthGetUser));
    hide = true;
    accessories: AccessoriesInterface | any = new AccessoriesInterface();
    accessoriesImage: AccessoriesImageInterface | any = new AccessoriesImageInterface();
    accessoriesArrList: Array<string> = [];
    customisedPricing = false;
    bikeQuantity = [0];
    listPrices: Array<number> = [1000, 2000, 3000, 4000, 5000, 6000]

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
        private apiRidesService: ApiRidesService
    ) {
        this.accessoriesARrr = this.accessories;
        this.setSvgImageToMat();
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
          available0: [true, Validators.required],
          size0: ['', Validators.required],
          frame_size0: ['', Validators.required],
          bicycle_number0: ['', Validators.required],
          frame_number0: ['', Validators.required],
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
          daily: ['',Validators.required],
          weekly: ['',Validators.required],
          price: ['',Validators.required],
          price1: ['',Validators.required],
          price2: ['',Validators.required],
          price3: ['',Validators.required],
          price4: ['',Validators.required],
          price5: ['',Validators.required],
          price6: ['',Validators.required],
          price7: ['',Validators.required],
        } ;

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

    previewFile(file: any): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.loadedPhoto.push({
                isMain: false,
                file,
                url: reader.result
            });
        };
    }

    removePhoto(i: number): void {
        this.loadedPhoto.splice(i, 1);
    }

    create() {
        const data = new BIKE();
        this.apiRidesService.createBike(data);
    }

    addVariants(index) {

        const obj = {
          size: ['', Validators.required],
          frame_size: ['', Validators.required],
          bicycle_number: ['', Validators.required],
          frame_number: ['', Validators.required],
        };

        Object
            .keys(obj)
            .forEach(i => this.detailsFormGroup.addControl(`${i + (index)}`, new FormControl(...obj[i])));

        const length = this.bikeQuantity.length;
        this.bikeQuantity.push(length + 1);
    }

    delQuantity(i) {
        this.bikeQuantity.splice(i, 1);
    }
}
