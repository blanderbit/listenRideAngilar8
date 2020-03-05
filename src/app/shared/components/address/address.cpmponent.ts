import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BusinessLocation} from '@models/business/business-location';
import {GeocoderAddressComponent} from '@agm/core';
import {Address} from '@models/user/address';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
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
  user$ = this.store.pipe(select(fromAuth.selectAuthGetUser));
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<fromAuth.State>) {
  }

  ngOnInit(): void {
    this.form = this.getForm();

    this.form.valueChanges
      .subscribe((value) => {
        if (!this.form.invalid) {
          this.addressReady.emit(value);
        } else {
          this.addressInvalid.emit(true);
        }
      });

    this.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({country, city, street, zip}) => {

        const streetWithoutNumber = this.getStreetWithoutNumber(street);
        const streetNumber = this.getNumberFromStreet(street);
        this.form.patchValue({country, city, street: streetWithoutNumber, number: streetNumber, zip});
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
    this.form.patchValue({...location});
    this.form.markAllAsTouched();
  }

  private parseLocation(addressComponents: GeocoderAddressComponent[]): BusinessLocation {
    const rawAddress = {
      country: null,
      route: null,
      street_number: null,
      locality: null,
      postal_code: null
    };

    addressComponents.forEach((address) => {
      rawAddress[address.types[0]] = address.long_name;
    });

    return {
      country: rawAddress.country,
      city: rawAddress.locality,
      street: rawAddress.route,
      number: rawAddress.street_number,
      zip: rawAddress.postal_code
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
      ...formControls
    });
  }

  private getStreetWithoutNumber(street: string): string {
    if (!street) {
      return null;
    }

    const segments = street.split(' ');


    if (segments.length) {
      if (!isNaN(Number(segments[segments.length - 1]))) {
        segments.splice(segments.length - 1, 1);
        return segments.join(' ');
      } else {
        return street;
      }
    } else {
      return null;
    }

  }

  private getNumberFromStreet(street: string): number {
    if (!street) {
      return null;
    }

    const segments = street.split(' ');

    if (segments.length) {
      return !isNaN(Number(segments[segments.length - 1])) ? Number(segments[segments.length - 1]) : null;
    } else {
      return null;
    }

  }
}
