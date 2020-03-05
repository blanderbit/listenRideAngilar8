import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {ApiUserService} from '@api/api-user/api-user.service';
import {MatHorizontalStepper, MatVerticalStepper} from '@angular/material/stepper';
import {User} from '@models/user/user';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthActions} from '@auth/store/actions';
import {Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {MatDialogRef} from '@angular/material/dialog';
import {UserVerificationDialogComponent} from '@user-verification/user-verification-dialog/user-verification-dialog.component';
import {UserVerificationStep} from '@user-verification/user-verification-step';
import {take} from 'rxjs/operators';

@Component({
  selector: 'lnr-user-verification-email',
  templateUrl: './user-verification-email.component.html',
  styleUrls: ['../user-verification.scss', './user-verification-email.component.scss'],
})
export class UserVerificationEmailComponent extends UserVerificationStep implements OnDestroy, OnChanges {
  private destroyed$ = new Subject();
  @Input() stepper: MatHorizontalStepper | MatVerticalStepper;
  @Input() dialogRef: MatDialogRef<UserVerificationDialogComponent>;
  @Input() isDesktop = true;
  @Input() isTablet = false;
  @Input() isMobile = false;
  @Input() user: User;
  verified = false;
  emailResend = false;
  emailPending = false;
  emailError: HttpErrorResponse;

  verificationPending = false;
  verificationError: HttpErrorResponse;

  constructor(private fb: FormBuilder,
              private apiUserService: ApiUserService,
              private store: Store<fromAuth.State>) {
    super();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      super.stepCompleted = this.user.confirmed_email;
    }
  }

  resendEmail() {
    this.emailPending = true;
    this.emailError = null;

    this.apiUserService.emailRequestConfirm()
      .subscribe((res) => {
        this.emailPending = false;
        this.emailResend = true;
      }, (error) => {
        this.emailPending = false;
        this.emailError = error;
      });
  }

  checkIfAlreadyConfirmed() {
    this.verificationPending = true;
    this.verificationError = null;

    this.apiUserService.read(this.user.id)
      .pipe(take(1))
      .subscribe((user) => {
        this.verificationPending = false;
        super.stepCompleted = user.confirmed_email;
        this.store.dispatch(AuthActions.updateUser({user}));
        if (user.confirmed_email) {
          this.nextOrCloseIfLastStep();
        }

      }, (error) => {
        this.verificationPending = false;
        this.verificationError = error;
      });
  }

}
