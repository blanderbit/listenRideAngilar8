import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {arrCountriesCode} from '../../consts/consts'
import {listPrices} from '../../../../shared/helpers/insurance-helper'

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

  obj = {
    findRoute: {
      type: 'route',
      control: 'street'
    }, findLocality: {
      type: 'locality',
      control: 'city'
    }, findPostCode: {
      type: 'postal_code',
      control: 'zip'
    }, findCountry: {
      type: 'country',
      control: 'country'
    }, findStreetNumber: {
      type: 'street_number',
      control: 'street'
    }
  };

  @Output('coverage') coverage = new EventEmitter();

  @ViewChild('address', {static: true}) address: ElementRef;
  @ViewChild('cities', {static: true}) cities: ElementRef;
  @ViewChild('regionsZip', {static: true}) regionsZip: ElementRef;
  @ViewChild('regionsCountry', {static: true}) regionsCountry: ElementRef;

  constructor(
    private changeDetection: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete(): void {
    if (!this.address || !this.cities || !this.regionsCountry || !this.regionsZip) {
      return;
    }

    debugger;
    const address = new google.maps.places.Autocomplete(this.address.nativeElement, {types: ['address']});
    const cities = new google.maps.places.Autocomplete(this.cities.nativeElement, {types: ['(cities)']});
    const regionsCountry = new google.maps.places.Autocomplete(this.regionsCountry.nativeElement, {types: ['(regions)']});
    const regionsZip = new google.maps.places.Autocomplete(this.regionsZip.nativeElement, {types: ['(regions)']});

    address.addListener('place_changed', () => {
      this.changeDataGoogleAutocomplete(
        address,
        'route',
        'street',
        this.address.nativeElement
      );
      this.fieldDataGoogleAutocomplete(address);
      this.setAllFieldAfterAutocomplete(address)
    });
    cities.addListener('place_changed', () => {
      this.changeDataGoogleAutocomplete(
        cities,
        'locality',
        'city',
        this.cities.nativeElement
      );
      this.validateCZCByStreet(cities);
    });
    regionsZip.addListener('place_changed', () => {
      this.changeDataGoogleAutocomplete(
        regionsZip,
        'postal_code',
        'zip',
        this.regionsZip.nativeElement
      );
      this.validateCZCByStreet(regionsZip);
    });
    regionsCountry.addListener('place_changed', () => {
      this.setAllFieldAfterAutocomplete(regionsCountry)
    });
    // var displaySuggestions = function(predictions, status) {
    //   debugger;
    //   if (status != google.maps.places.PlacesServiceStatus.OK) {
    //     alert(status);
    //     return;
    //   }
    //
    //   predictions.forEach(function(prediction) {
    //     var li = document.createElement('li');
    //     li.appendChild(document.createTextNode(prediction.description));
    //     document.getElementById('results').appendChild(li);
    //   });
    // };
    //
    // var service = new google.maps.places.AutocompleteService();
    // service.getQueryPredictions({ input: 'pizza near Syd' }, displaySuggestions);
  }

  setAllFieldAfterAutocomplete(
    data: object | any
  ):void{
    const name = data.getPlace();
    const finds = name.address_components
      .filter(item => item.short_name && item.types.includes('country'));
    const findCountry = finds.find((item) => {
      return this.arrCountriesCode.includes(item && item.short_name  && item.short_name.toLowerCase())
    });
    const find = findCountry || finds[0];
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
    element: HTMLInputElement
  ): void {
    const name = data.getPlace();
    const find = name.address_components
      .find(item => item.short_name && item.types.includes(includeName));
    const value = find && find.long_name === name.name ? find.long_name : name.name;
    const control = this.locationFormGroup.controls[controlName];

    control && control.setValue(find && find.long_name === name.name ? find.long_name : name.name);
    element.value = value;
  }

  fieldDataGoogleAutocomplete(
    data: object | any
  ): void {
    const name = data.getPlace();

    Object.keys(this.obj).forEach(key => {
      const methods = this.obj[key];
      const find = name.address_components
        .find(item => item.short_name && item.types.includes(methods && methods.type));
      if('findST' === key) {
        const streetValue = this.locationFormGroup.controls.street.value;
        return find && this.locationFormGroup.controls.street.setValue(
          `${streetValue}${find ? ', ' + find.long_name : ''}`
        );
      }
      find && this.locationFormGroup.controls[methods.control].setValue(find.long_name);
    });
  }

  validateCZCByStreet(
    data: object | any
  ){
    const name = data.getPlace();
    console.log(name)
  }

  changeCountry = (e: any): void => this.checkCountry(e.target.value);

  checkCountry(str: string): void {
    const find = this.arrCountriesCode.includes(str && str.toLowerCase());
    this.coverage.emit(!!find);
  }
}
