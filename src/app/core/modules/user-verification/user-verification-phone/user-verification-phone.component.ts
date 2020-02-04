import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiUserService} from '@api/api-user/api-user.service';
import {CountryISO, SearchCountryField, TooltipLabel} from 'ngx-intl-tel-input';
import {PhoneConfirmRequest} from '@models/user/phone-confirm-request';
import {PhoneUpdateRequest} from '@models/user/phone-update-request';
import {HttpErrorResponse} from '@angular/common/http';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'lnr-user-verification-phone',
  templateUrl: './user-verification-phone.component.html',
  styleUrls: ['./user-verification-phone.component.scss']
})
export class UserVerificationPhoneComponent implements OnInit {
  private destroyed$ = new Subject();
  @Input() stepper: MatHorizontalStepper;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  defaultCountry = CountryISO.Germany;
  phoneForm: FormGroup;
  codeForm: FormGroup;
  phoneError: HttpErrorResponse;
  codeError: HttpErrorResponse;
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

  constructor(private fb: FormBuilder,
              private apiUserService: ApiUserService) {
  }

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
