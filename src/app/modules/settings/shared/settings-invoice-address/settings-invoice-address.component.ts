import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiUserService} from '@api/api-user/api-user.service';
import {BusinessLocation} from '@models/business/business-location';
import {GeocoderAddressComponent} from '@agm/core';
import {User} from '@models/user/user';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'lnr-settings-invoice-address',
  templateUrl: './settings-invoice-address.component.html',
  styleUrls: ['../settings-form.scss', './settings-invoice-address.component.scss']
})
export class SettingsInvoiceAddressComponent implements OnInit {
  private destroyed$ = new Subject();
  mode: 'view' | 'update' = 'view';
  @Input() user: User;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private apiUserService: ApiUserService) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
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

  submit() {
    if (this.form.invalid) {
      return;
    }

    const street = this.form.get('street').value;
    const streetNumber = this.form.get('number').value;

    const locationReq: Partial<User> = {
      locations: [
        {
          ...this.form.value,
          street: street && streetNumber ? street + ' ' + streetNumber : street
        }
      ]
    };

    this.apiUserService.update(17289, locationReq)
      .subscribe((res) => {
      }, (error) => {
      });
  }

  private getForm() {
    const formControls = {
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      city: [null, [Validators.required]],
      country: [null, [Validators.required]],
      primary: [true],
    };

    return this.fb.group({
      ...formControls
    });
  }
}
