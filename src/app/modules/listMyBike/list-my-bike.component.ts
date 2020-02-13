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
    FormBuilder,
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
import {BIKE} from './model/bike.model';
import {ApiRidesBikeService} from './../../core/services/api/api-rides-bike/api-rides-bike.service';

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
    bikeQuantity = [1, 2];

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
        private apiRidesBikeService: ApiRidesBikeService
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
            categoryCtrl: ['', Validators.required],
            subCategoryCtrl: ['', Validators.required]
        };
        const detailsCtrl = ['', Validators.required];
        const picturesCtrl = {
                picturesCtrl_0: ['', Validators.required]
            }
        ;
        const locationCtrl = [''];
        const pricingCtrl = ['', Validators.required];

        this.categoryFormGroup = this.formBuilder.group(category);
        this.detailsFormGroup = this.formBuilder.group({detailsCtrl});
        this.picturesFormGroup = this.formBuilder.group(picturesCtrl);
        this.locationFormGroup = this.formBuilder.group({locationCtrl});
        this.pricingFormGroup = this.formBuilder.group({pricingCtrl});
    }

    changeCategory = (e: any): void => {
        this.categoryFormGroup.controls.subCategoryCtrl.setValue('');
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
            // this._formBuilder.group({picturesCtrl1, picturesCtrl2, picturesCtrl3});
        };
    }

    removePhoto(i: number): void {
        this.loadedPhoto.splice(i, 1);
    }

    create() {
        const data: BIKE = new BIKE();
        this.apiRidesBikeService.createBike(data);
    }

    addVariants() {
        const length = this.bikeQuantity.length;
        this.bikeQuantity.push(length + 1);
    }

    delQuantity(i) {
        this.bikeQuantity.splice(i - 1, 1);

    }
}
