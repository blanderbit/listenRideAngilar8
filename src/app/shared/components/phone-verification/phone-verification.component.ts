import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {User} from '@models/user/user';
import {CountryISO, SearchCountryField, TooltipLabel} from 'ngx-intl-tel-input';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiUserService} from '@api/api-user/api-user.service';
import {preferredCountries} from './preferred-countries.config';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {PhoneControlOutput} from './phone-control-output';

@Component({
  selector: 'lnr-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit {
  private destroyed$ = new Subject();
  user$ = this.store.pipe(select(fromAuth.selectUser));
  @Output() phoneReady = new EventEmitter<PhoneControlOutput>();
  @Output() phoneInvalid = new EventEmitter<boolean>();

  timeout = false;

  @Input() stepper: MatHorizontalStepper;
  @Input() user: User;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  defaultCountry = CountryISO.Germany;
  form: FormGroup;
  preferredCountries: CountryISO[] = preferredCountries;

  constructor(private fb: FormBuilder,
              private apiUserService: ApiUserService,
              private store: Store<fromAuth.State>) {
  }

  ngOnInit(): void {
    // TODO: https://github.com/webcat12345/ngx-intl-tel-input/issues/220
    setTimeout(() => {
      this.timeout = true;
    }, 500);

    this.form = this.getForm();

    this.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({phoneNumber}) => {
        this.form.patchValue({phone_number: this.addPlusToPhone(phoneNumber)});
      });

    this.form.get('phone_number').valueChanges
      .subscribe((value) => {
        if (!this.form.get('phone_number').invalid) {
          this.phoneReady.emit(value);
        } else {
          this.phoneInvalid.emit(true);
        }
      });

  }

  private getForm() {
    const formControls = {
      phone_number: [null, [Validators.required]],
    };

    return this.fb.group({
      ...formControls
    });
  }

  private addPlusToPhone(phone: string): string {
    if (phone && phone.length) {
      if (phone.indexOf('+') >= 0) {
        return phone;
      } else {
        return `+${phone}`;
      }
    } else {
      return null;
    }
  }
}
