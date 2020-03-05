import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {Business} from '@models/business/business';
import {MatHorizontalStepper, MatVerticalStepper} from '@angular/material/stepper';
import {User} from '@models/user/user';
import {take} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthActions} from '@auth/store/actions';
import {Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {MatDialogRef} from '@angular/material/dialog';
import {UserVerificationDialogComponent} from '@user-verification/user-verification-dialog/user-verification-dialog.component';
import {UserVerificationStep} from '@user-verification/user-verification-step';

@Component({
  selector: 'lnr-user-verification-vat',
  templateUrl: './user-verification-vat.component.html',
  styleUrls: ['../user-verification.scss', './user-verification-vat.component.scss'],
})
export class UserVerificationVatComponent extends UserVerificationStep implements OnInit {
  @Input() stepper: MatHorizontalStepper | MatVerticalStepper;
  @Input() dialogRef: MatDialogRef<UserVerificationDialogComponent>;
  @Input() isDesktop = true;
  @Input() isTablet = false;
  @Input() isMobile = false;
  @Input() user: User;
  form: FormGroup;
  pending = false;
  error: HttpErrorResponse;

  constructor(private fb: FormBuilder,
              private apiBusinessService: ApiBusinessService,
              private store: Store<fromAuth.State>) {
    super();
  }

  ngOnInit(): void {
    this.form = this.getForm();

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const business: { business: Partial<Business> } = {...this.form.value};

    this.pending = true;
    this.error = null;

    this.apiBusinessService.update(this.user.business.id, business)
      .pipe(take(1))
      .subscribe((res) => {
        this.pending = false;
        this.store.dispatch(AuthActions.updateUserByApi());
        this.nextOrCloseIfLastStep();
        super.stepCompleted = true;
      }, (error) => {
        this.pending = false;
        this.error = error;
        super.stepCompleted = false;
      });
  }

  get businessForm(): AbstractControl | null {
    return this.form.get('business');
  }

  private getForm() {
    const formControls = {
      business: this.fb.group(
        {
          vat: [this.user.business.vat, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        }
      ),
    };

    return this.fb.group({
      ...formControls
    });
  }
}
