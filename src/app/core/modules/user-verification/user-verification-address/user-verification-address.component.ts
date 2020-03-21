// TODO Fix to avoid eslint-disable (see below in file). This file is invalid!
import { Component, Input } from '@angular/core';
import { ApiUserService } from '@api/api-user/api-user.service';
import { User } from '@models/user/user';
import {
  MatHorizontalStepper,
  MatVerticalStepper,
} from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthActions } from '@auth/store/actions';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { Address } from '@models/user/address';
import { take } from 'rxjs/operators';
import { AddressUpdateRequest } from '@models/user/address-update-request';
import { MatDialogRef } from '@angular/material/dialog';
import { UserVerificationDialogComponent } from '@user-verification/user-verification-dialog/user-verification-dialog.component';
import { UserVerificationStep } from '@user-verification/user-verification-step';

@Component({
  selector: 'lnr-user-verification-address',
  templateUrl: './user-verification-address.component.html',
  styleUrls: [
    '../user-verification.scss',
    './user-verification-address.component.scss',
  ],
})
export class UserVerificationAddressComponent extends UserVerificationStep {
  @Input() stepper: MatHorizontalStepper | MatVerticalStepper;

  @Input() dialogRef: MatDialogRef<UserVerificationDialogComponent>;

  @Input() isDesktop = true;

  @Input() isTablet = false;

  @Input() isMobile = false;

  @Input() user: User;

  address: Address;

  addressSaved = false;

  addressPending = false;

  addressError: HttpErrorResponse;

  constructor(
    private apiUserService: ApiUserService,
    private store: Store<fromAuth.State>,
  ) {
    super();
  }

  onAddressReady(address: Address) {
    this.address = address;
    this.addressSaved = false;
    super.stepCompleted = false;
  }

  onAddressInvalid(invalid: boolean) {
    this.address = null;
    this.addressSaved = false;
    super.stepCompleted = false;
  }

  submit() {
    if (!this.address) {
      return;
    }

    const locationReq: AddressUpdateRequest = this.getLocationRequestBody(
      this.user,
      this.address,
    );

    this.addressPending = true;
    this.addressError = null;

    this.apiUserService
      .update(this.user.id, locationReq)
      .pipe(take(1))
      .subscribe(
        user => {
          this.addressPending = false;
          this.store.dispatch(AuthActions.updateUser({ user }));
          this.addressSaved = true;
          super.stepCompleted = true;
          super.nextOrCloseIfLastStep();
        },
        error => {
          super.stepCompleted = false;
          this.addressPending = false;
          this.addressError = error;
        },
      );
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  private getLocationRequestBody(
    user: User,
    address: Address,
  ): AddressUpdateRequest {
    if (user.locations) {
      // TODO: check how to create request if user already has locations
      const existingLocations = Object.keys(user.locations);

      if (existingLocations.length) {
        // eslint-disable-next-line no-param-reassign
        address.street =
          address.street && address.number
            ? `${address.street} ${address.number}`
            : address.street;
        // eslint-disable-next-line no-param-reassign
        address.primary = false;

        return {
          locations: {
            [++existingLocations.length]: {
              ...address,
            },
          },
        };
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      address.street =
        address.street && address.number
          ? `${address.street} ${address.number}`
          : address.street;
      // eslint-disable-next-line no-param-reassign
      address.primary = true;

      return {
        locations: {
          0: {
            ...address,
          },
        },
      };
    }
  }
}
