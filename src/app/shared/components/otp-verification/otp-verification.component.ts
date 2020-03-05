import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsLnr} from '@validators/validators-lnr';

@Component({
  selector: 'lnr-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  @Output() otpReady = new EventEmitter<string>();
  @Output() otpInvalid = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.getForm();

    this.form.get('phone_confirmation_code').valueChanges
      .subscribe((value) => {
        if (!this.form.get('phone_confirmation_code').invalid) {
          this.otpReady.emit(value);
        } else {
          this.otpInvalid.emit(true);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getForm() {
    const formControls = {
      phone_confirmation_code: ['', [Validators.required, ValidatorsLnr.minLength(4), ValidatorsLnr.maxLength(6)]],
    };

    return this.fb.group({
      ...formControls
    });
  }

}
