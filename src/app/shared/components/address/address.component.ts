import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessLocation } from '@models/business/business-location';
import { GeocoderAddressComponent } from '@agm/core';
import { Address } from '@models/user/address';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'lnr-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  @Output() addressReady = new EventEmitter<Address>();

  @Output() addressInvalid = new EventEmitter<boolean>();

  user$ = this.store.pipe(select(fromAuth.selectUser));

  form: FormGroup;

  address: string;

  rawAddress = {
    country: null,
    route: null,
    // eslint-disable-next-line @typescript-eslint/camelcase
    street_number: null,
    locality: null,
    // eslint-disable-next-line @typescript-eslint/camelcase
    postal_code: null,
  };

  segments;

  constructor(private fb: FormBuilder, private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.form = this.getForm();

    this.form.valueChanges.subscribe(value => {
      if (!this.form.invalid) {
        this.addressReady.emit(value);
      } else {
        this.addressInvalid.emit(true);
      }
    });

    this.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ country, city, street, zip }) => {
        const streetWithoutNumber = this.getStreetWithoutNumber(street);
        const streetNumber = this.getNumberFromStreet(street);
        this.address = `${street}, ${city}, ${country}`;
        this.form.patchValue({
          country,
          city,
          street: streetWithoutNumber,
          number: streetNumber,
          zip,
        });
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onAutocompleteSelected(selection: PlaceResult) {
    const location = this.parseLocation(selection.address_components);

    this.setFormValue(location);
  }

  setFormValue(location: BusinessLocation) {
    this.form.patchValue({ ...location });
    this.form.markAllAsTouched();
  }

  private parseLocation(
    addressComponents: GeocoderAddressComponent[],
  ): BusinessLocation {
    addressComponents.forEach(address => {
      this.rawAddress[address.types[0]] = address.long_name;
    });

    return {
      country: this.rawAddress.country,
      city: this.rawAddress.locality,
      street: this.rawAddress.route,
      number: this.rawAddress.street_number,
      zip: this.rawAddress.postal_code,
    };
  }

  private getForm() {
    const formControls = {
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      primary: [true],
    };

    return this.fb.group({
      ...formControls,
    });
  }

  private getStreetWithoutNumber(street: string): string {
    if (!street) {
      return null;
    }

    this.segments = street.split(' ');

    if (this.segments.length) {
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(Number(this.segments[this.segments.length - 1]))) {
        this.segments.splice(this.segments.length - 1, 1);
        return this.segments.join(' ');
      }
      return street;
    }
    return null;
  }

  private getNumberFromStreet(street: string): number {
    if (!street) {
      return null;
    }

    this.segments = street.split(' ');

    if (this.segments.length) {
      // eslint-disable-next-line no-restricted-globals
      return !isNaN(Number(this.segments[this.segments.length - 1]))
        ? Number(this.segments[this.segments.length - 1])
        : null;
    }
    return null;
  }
}
