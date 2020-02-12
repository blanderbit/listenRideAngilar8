import {Component, OnInit} from '@angular/core';
import {CountryISO, SearchCountryField, TooltipLabel} from 'ngx-intl-tel-input';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiUserService} from '@api/api-user/api-user.service';
import {PhoneUpdateRequest} from '@models/user/phone-update-request';
import {PhoneConfirmRequest} from '@models/user/phone-confirm-request';

@Component({
  selector: 'lnr-phone-update',
  templateUrl: './phone-update.component.html',
  styleUrls: ['./phone-update.component.scss']
})
export class PhoneUpdateComponent implements OnInit {
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  defaultCountry = CountryISO.Germany;
  preferredCountries: CountryISO[] = [
    CountryISO.Germany,
    CountryISO.Austria,
    CountryISO.Netherlands,
    CountryISO.CzechRepublic,
    CountryISO.UnitedKingdom,
    CountryISO.France,
    CountryISO.Estonia,
    CountryISO.Italy,
    CountryISO.Denmark,
    CountryISO.Portugal,
    CountryISO.Belgium,
    CountryISO.Poland,
  ];
  phoneForm: FormGroup;
  codeForm: FormGroup;
  phoneError: HttpErrorResponse;
  codeError: HttpErrorResponse;

  constructor(
    // public dialogRef: MatDialogRef<PhoneUpdateDialogComponent>,
    private fb: FormBuilder,
    private apiUserService: ApiUserService
  ) {
  }

  // close() {
  //   this.dialogRef.close();
  // }

  ngOnInit(): void {
    this.phoneForm = this.getPhoneForm();
    this.codeForm = this.getCodeForm();
  }

  submitPhone() {
    if (this.phoneForm.invalid) {
      return;
    }

    const phoneUpdateRequest: PhoneUpdateRequest = {
      phone_number: this.phoneForm.value.phone_number.internationalNumber
    };

    this.apiUserService.phoneUpdate(17289, phoneUpdateRequest)
      .subscribe((res) => {
      }, (error) => {
        this.phoneError = error;
      });

  }

  submitCode() {
    if (this.codeForm.invalid) {
      return;
    }

    const phoneConfirmRequest: PhoneConfirmRequest = {...this.codeForm.value};

    this.apiUserService.phoneConfirm(phoneConfirmRequest)
      .subscribe((res) => {
      }, (error) => {
        this.codeError = error;
      });
  }

  private getPhoneForm() {
    const formControls = {
      phone_number: [null, [Validators.required]],
    };

    return this.fb.group({
      ...formControls
    });
  }

  private getCodeForm() {
    const formControls = {
      phone_confirmation_code: [null, [Validators.required]],
    };

    return this.fb.group({
      ...formControls
    });
  }
}
