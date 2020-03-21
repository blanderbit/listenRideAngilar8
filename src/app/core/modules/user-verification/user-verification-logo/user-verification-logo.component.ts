// TODO Fix to avoid eslint-disable (see below in file). This file is invalid!
import { Component, Input } from '@angular/core';
import {
  MatHorizontalStepper,
  MatVerticalStepper,
} from '@angular/material/stepper';
import { User } from '@models/user/user';
import { CroppedImage } from '@shared/components/profile-picture/profile-picture-editor/cropped-image';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUserService } from '@api/api-user/api-user.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from '@auth/store/actions';
import { MatDialogRef } from '@angular/material/dialog';
import { UserVerificationDialogComponent } from '@user-verification/user-verification-dialog/user-verification-dialog.component';
import { UserVerificationStep } from '@user-verification/user-verification-step';

@Component({
  selector: 'lnr-user-verification-logo',
  templateUrl: './user-verification-logo.component.html',
  styleUrls: [
    '../user-verification.scss',
    './user-verification-logo.component.scss',
  ],
})
export class UserVerificationLogoComponent extends UserVerificationStep {
  @Input() stepper: MatHorizontalStepper | MatVerticalStepper;

  @Input() dialogRef: MatDialogRef<UserVerificationDialogComponent>;

  @Input() isDesktop = true;

  @Input() isTablet = false;

  @Input() isMobile = false;

  @Input() user: User;

  croppedImage: CroppedImage;

  saved = true;

  pending = false;

  error: HttpErrorResponse;

  constructor(
    private apiUserService: ApiUserService,
    private store: Store<fromAuth.State>,
  ) {
    super();
  }

  submit() {
    this.pending = true;
    this.error = null;

    if (!this.croppedImage) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return this.apiUserService
      .updateLogo(this.user.id, this.croppedImage.blob, this.croppedImage.name)
      .subscribe(
        user => {
          this.pending = false;
          this.saved = true;
          this.store.dispatch(AuthActions.updateUser({ user }));
          super.stepCompleted = true;
          super.nextOrCloseIfLastStep();
        },
        error => {
          this.pending = false;
          this.error = error;
          super.stepCompleted = false;
        },
      );
  }

  onImageReady(image: CroppedImage) {
    this.croppedImage = image;
    this.saved = false;
  }

  onImageEmpty() {
    this.croppedImage = null;
  }
}
