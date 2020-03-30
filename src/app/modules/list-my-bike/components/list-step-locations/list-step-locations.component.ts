/* eslint-disable */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { arrCountriesCode, arrCountriesNames } from '../../consts/consts';
import { listPrices } from '@shared/helpers/insurance-helper';
import { objTypeControl, staticField } from './consts';
declare let google: any;
declare let window: any;
import {} from 'google-maps';

@Component({
  selector: 'lnr-list-step-locations',
  templateUrl: './list-step-locations.component.html',
  styleUrls: ['./list-step-locations.component.scss'],
})
export class ListStepLocationsComponent implements AfterViewInit {
  @Input() locationFormGroup: FormGroup;
  @Input() isCoverage: boolean;
  listPrices: Array<number> = listPrices;
  arrCountriesCode: Array<string> = arrCountriesCode;
  arrCountriesNames: Array<string> = arrCountriesNames;
  loading = false;
  obj = objTypeControl;

  @Output('coverage') coverage = new EventEmitter();

  @ViewChild('address', staticField) address: ElementRef;
  @ViewChild('cities', staticField) cities: ElementRef;
  @ViewChild('regionsZip', staticField) regionsZip: ElementRef;
  @ViewChild('regionsCountry', staticField) regionsCountry: ElementRef;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete(): void {
    if (
      !this.address ||
      !this.cities ||
      !this.regionsCountry ||
      !this.regionsZip
    ) {
      return;
    }

    const address = new google.maps.places.Autocomplete(
      this.address.nativeElement,
      { types: ['address'] },
    );
    const cities = new google.maps.places.Autocomplete(
      this.cities.nativeElement,
      { types: ['(cities)'] },
    );
    const regionsCountry = new google.maps.places.Autocomplete(
      this.regionsCountry.nativeElement,
      { types: ['(regions)'] },
    );
    const regionsZip = new google.maps.places.Autocomplete(
      this.regionsZip.nativeElement,
      { types: ['(regions)'] },
    );

    address.addListener('place_changed', () => {
      this.changeDataGoogleAutocomplete(
        address,
        'route',
        'street',
        this.address.nativeElement,
      );
      this.fieldDataGoogleAutocomplete(address);
      this.setAllFieldAfterAutocomplete(address);
    });

    cities.addListener('place_changed', () => {
      this.changeDataGoogleAutocomplete(
        cities,
        'locality',
        'city',
        this.cities.nativeElement,
      );
    });

    regionsZip.addListener('place_changed', () => {
      this.changeDataGoogleAutocomplete(
        regionsZip,
        'postal_code',
        'zip',
        this.regionsZip.nativeElement,
      );
    });

    regionsCountry.addListener('place_changed', () => {
      this.setAllFieldAfterAutocomplete(regionsCountry);
    });
  }

  setAllFieldAfterAutocomplete(data: object | any): void {
    const name = data.getPlace();
    const searchAddress = (name.address_components || []).filter(
      item => item.short_name && item.types.includes('country'),
    );
    const findCountry = searchAddress.find(item => {
      return this.arrCountriesCode.includes(
        item && item.short_name && item.short_name.toLowerCase(),
      );
    });
    const find = findCountry || searchAddress[0];
    const value = find ? find.long_name || name.name : name.name;
    this.regionsCountry.nativeElement.value = value;
    this.locationFormGroup.controls.country.setValue(value);
    this.coverage.emit(!!findCountry);
    this.regionsCountry.nativeElement.focus();
    this.regionsCountry.nativeElement.blur();
    this.changeDetection.detectChanges();
  }

  changeDataGoogleAutocomplete(
    data: object | any,
    includeName: string,
    controlName: string,
    element: HTMLInputElement,
  ): void {
    const name = data.getPlace();
    const find = name.address_components.find(
      item => item.short_name && item.types.includes(includeName),
    );
    const value =
      find && find.long_name === name.name ? find.long_name : name.name;
    const control = this.locationFormGroup.controls[controlName];

    control &&
      control.setValue(
        find && find.long_name === name.name ? find.long_name : name.name,
      );
    element.value = value;
  }

  fieldDataGoogleAutocomplete(data: object | any): void {
    const name = data.getPlace();

    Object.keys(this.obj).forEach(key => {
      const methods = this.obj[key];

      const searchAddressComponents =
        name &&
        name.address_components.find(
          item =>
            item.short_name && item.types.includes(methods && methods.type),
        );
      if ('findStreetNumber' === key) {
        const streetValue = this.locationFormGroup.controls.street.value;
        return (
          searchAddressComponents &&
          this.locationFormGroup.controls.street.setValue(
            `${streetValue}${
              searchAddressComponents
                ? ',' + searchAddressComponents.long_name
                : ''
            }`,
          )
        );
      }
      searchAddressComponents &&
        this.locationFormGroup.controls[methods.control].setValue(
          searchAddressComponents.long_name,
        );
    });
  }

  isInvalidForm(nameControl: string): boolean {
    const control = this.locationFormGroup.controls[nameControl];
    return control && control.invalid;
  }

  changeCountry = (e: any): void => this.checkCountry(e.target.value);

  checkCountry(str: string): void {
    let findCountryCode = this.arrCountriesCode.includes(
      str && str.toLowerCase(),
    );
    findCountryCode =
      findCountryCode ||
      this.arrCountriesNames.includes(str && str.toLowerCase());
    this.coverage.emit(!!findCountryCode);
  }
}
