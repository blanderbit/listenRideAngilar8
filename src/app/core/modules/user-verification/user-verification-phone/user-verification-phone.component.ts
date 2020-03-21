// TODO Fix to avoid eslint-disable (see below in file). This file is invalid!
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ApiUserService } from '@api/api-user/api-user.service';
import { PhoneConfirmRequest } from '@models/user/phone-confirm-request';
import { PhoneUpdateRequest } from '@models/user/phone-update-request';
import { HttpErrorResponse } from '@angular/common/http';
import {
  MatHorizontalStepper,
  MatVerticalStepper,
} from '@angular/material/stepper';
import { User } from '@models/user/user';
import { AuthActions } from '@auth/store/actions';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { MatDialogRef } from '@angular/material/dialog';
import { UserVerificationDialogComponent } from '@user-verification/user-verification-dialog/user-verification-dialog.component';
import { UserVerificationStep } from '@user-verification/user-verification-step';
import { PhoneControlOutput } from '../../../../shared/components/phone-verification/phone-control-output';

@Component({
  selector: 'lnr-user-verification-phone',
  templateUrl: './user-verification-phone.component.html',
  styleUrls: [
    '../user-verification.scss',
    './user-verification-phone.component.scss',
  ],
})
export class UserVerificationPhoneComponent extends UserVerificationStep
  implements OnChanges, OnDestroy {
  private destroyed$ = new Subject();

  @Input() stepper: MatHorizontalStepper | MatVerticalStepper;

  @Input() dialogRef: MatDialogRef<UserVerificationDialogComponent>;

  @Input() isDesktop = true;

  @Input() isTablet = false;

  @Input() isMobile = false;

  @Input() user: User;

  phoneControlOutput: PhoneControlOutput;

  phoneConfirmed = false;

  phonePending = false;

  phoneError: HttpErrorResponse;

  otp: string;

  otpConfirmed = false;

  otpPending = false;

  otpError: HttpErrorResponse;

  resendOtpSuccess = false;

  resendOtpPending = false;

  resendOtpError: HttpErrorResponse;

  constructor(
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
    private store: Store<fromAuth.State>,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && !changes.firstChange) {
      this.checkIfUserPhoneIsNotVerified(this.user);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  requestOtp() {
    this.phonePending = true;
    this.phoneError = null;
    this.otp = null;
    this.otpConfirmed = false;

    const phoneUpdateRequest: PhoneUpdateRequest = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      phone_number: this.phoneControlOutput.internationalNumber,
    };

    this.apiUserService.phoneUpdate(this.user.id, phoneUpdateRequest).subscribe(
      res => {
        this.phoneConfirmed = true;
        this.phonePending = false;
      },
      error => {
        this.phoneConfirmed = false;
        this.phonePending = false;
        this.phoneError = error;
      },
    );
  }

  confirmOtp() {
    if (!this.otp) {
      return;
    }

    this.otpPending = true;
    this.otpError = null;

    const phoneConfirmRequest: PhoneConfirmRequest = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      phone_confirmation_code: this.otp,
    };

    this.apiUserService.phoneConfirm(phoneConfirmRequest).subscribe(
      res => {
        this.otpConfirmed = true;
        this.otpPending = false;
        this.store.dispatch(AuthActions.updateUserByApi());
        this.changeNumber();

        this.store.dispatch(AuthActions.updateUserByApi());
        super.stepCompleted = true;
        super.nextOrCloseIfLastStep();
      },
      error => {
        this.otpConfirmed = false;
        this.otpPending = false;
        this.otpError = error;
        super.stepCompleted = false;
      },
    );
  }

  resendOtp() {
    if (!this.phoneControlOutput.internationalNumber) {
      return;
    }

    const phoneUpdateRequest: PhoneUpdateRequest = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      phone_number: this.phoneControlOutput.internationalNumber,
    };

    this.resendOtpSuccess = false;
    this.resendOtpPending = true;

    this.apiUserService.phoneUpdate(this.user.id, phoneUpdateRequest).subscribe(
      res => {
        this.resendOtpSuccess = true;
        this.phoneConfirmed = true;
        this.resendOtpPending = false;
      },
      error => {
        this.phoneConfirmed = false;
        this.phonePending = false;
        this.phoneError = error;
      },
    );
  }

  onPhoneReady(phoneControlOutput: PhoneControlOutput) {
    this.phoneControlOutput = phoneControlOutput;
  }

  onPhoneInvalid(invalid: boolean) {
    this.phoneControlOutput = null;
  }

  onOtpReady(otp: string) {
    this.otp = otp;
  }

  onOtpInvalid(invalid: boolean) {
    this.otp = null;
  }

  changeNumber() {
    this.phoneConfirmed = false;
    this.phoneError = null;
    this.otp = null;
    this.otpConfirmed = false;
    this.otpError = null;
    super.stepCompleted = false;
  }

  private checkIfUserPhoneIsNotVerified(user: User | any) {
    if (user && user.confirmed_phone) {
      super.stepCompleted = true;
    }
  }
}
