// TODO @Smirnoff: Fix all the esLint errors
/* eslint-disable */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import * as fromAuth from '@auth/store/reducers';
import { ApiRidesService } from '@api/api-rides/api-rides.service';
import { BIKE } from '@models/bike/bike.model';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '@models/user/user';
// import { BookWidgetComponent } from '../../shared/components/book-widget/book-widget.component';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

const now = new Date();

@Component({
  selector: 'lnr-bike-request-flow',
  templateUrl: './bikes-request-flow.component.html',
  styleUrls: ['./bikes-request-flow.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: true,
        displayDefaultIndicatorType: false,
      },
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class BikesRequestFlowComponent implements OnInit {
  constructor(
    private store: Store<fromAuth.State>,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private apiRidesService: ApiRidesService,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    private deviceDetectorService: DeviceDetectorService,
  ) {}

  isLinear = false;

  durationFormGroup: FormGroup;

  signInFormGroup: FormGroup;

  phoneFormGroup: FormGroup;

  personalDetailsFormGroup: FormGroup;

  paymentMethodFormGroup: FormGroup;

  rentalOverviewFormGroup: FormGroup;

  userId: Store<fromAuth.State> | any;

  data: BIKE | any;

  editData: any;

  public datesRange = [now, now];

  duration = 0;

  @ViewChild('stepper', { static: false }) private stepper: MatStepper;

  @ViewChild('stepper1', { static: false }) private stepper1: MatStepper;
  // @ViewChild('widget', { static: false }) private widget: BookWidgetComponent;

  isDesktop = true;

  isTablet = false;

  isMobile = false;

  user: User | any;

  bike: BIKE | any;

  private destroyed$ = new Subject();

  ok: any;

  hasInsurance = true;

  ngOnInit(): void {
    this.activateRoute.data
      .pipe(
        map(({ user, bike }) => {
          const isBike =
            bike && bike.queryParams && bike.queryParams.start_date;
          if (isBike) {
            const arr = [];
            const start = bike.queryParams.start_date || now;
            const { duration } = bike.queryParams;

            if (start) {
              arr.push(new Date(start));
            }

            if (duration) {
              arr.push(
                new Date(
                  moment
                    .unix(moment(new Date(start)).unix() + Number(duration))
                    .toISOString(),
                ),
              );
            } else {
              arr.push(new Date(start));
            }
            this.stepper && (this.stepper.selectedIndex = 1);
            this.stepper1 && (this.stepper1.selectedIndex = 1);
            this.datesRange = arr;
            this.duration = duration;
          }
          if (user) {
            this.userId = user.id;
            this.user = user;
          }

          if (user && isBike) {
            this.stepper && (this.stepper.selectedIndex = 2);
            this.stepper1 && (this.stepper1.selectedIndex = 2);

            if (user.confirmed_phone) {
              this.stepper && (this.stepper.selectedIndex = 3);
              this.stepper1 && (this.stepper1.selectedIndex = 3);
            }

            if (
              user.street &&
              user.zip &&
              user.city &&
              user.country &&
              user.pretty_phone_number
            ) {
              this.stepper && (this.stepper.selectedIndex = 4);
              this.stepper1 && (this.stepper1.selectedIndex = 4);
            }

            if (user.payment_method) {
              this.stepper && (this.stepper.selectedIndex = 5);
              this.stepper1 && (this.stepper1.selectedIndex = 5);
            }
          }
          this.editData = !!bike;
          return bike;
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe(
        next => {
          this.data = next || new BIKE();
          this.setDataToPage();
        },
        e => {
          console.log(e);
          this.snackBar('we have some error');
        },
      );
    this.isTablet = this.deviceDetectorService.isTablet();
    this.isMobile = this.deviceDetectorService.isMobile();
    this.isDesktop = this.deviceDetectorService.isDesktop();
  }

  setDataToPage(): void {
    //
    const duration = {
      // size: ['', Validators.required],
      //
      // duration: ['', Validators.required],
      //     subCategory: [SubcategoryValue, Validators.required]
    };

    const signIn = {
      // available: [true],
      // frame_size: [frameSizeValue],
      // bicycle_number: [bicycleNumberValue],
      // frame_number: [frameNumberValue],
      // brand: [brandValue, Validators.required],
      // name: [nameValue, Validators.required],
      // description: [descriptionValue, [Validators.minLength(100), Validators.required]],
    };

    const phone = {};
    const personalDetails = {
      // picturesCtrl_0: ['', Validators.required]
    };

    const paymentMethod: any = {
      // street: [streetValue, Validators.required],
      // zip: [zipValue, Validators.required],
      // city: [cityValue, Validators.required],
      // country: [countryValue, Validators.required],
    };

    // this.checkCountry(this.data.country_code);
    // this.hasCoverage && (locationCtrl.coverage_total = [coverageTotalValue, Validators.required]);

    const bookingOverview = {
      // daily: [dailyValue, Validators.required],
      // weekly: [weeklyValue, Validators.required],
      // price: [dailyPriceValue, Validators.required],
    };

    this.durationFormGroup = this.formBuilder.group(duration);
    this.signInFormGroup = this.formBuilder.group(signIn);
    this.phoneFormGroup = this.formBuilder.group(phone);
    this.personalDetailsFormGroup = this.formBuilder.group(personalDetails);
    this.paymentMethodFormGroup = this.formBuilder.group(paymentMethod);
    this.rentalOverviewFormGroup = this.formBuilder.group(bookingOverview);
  }

  next(e: any) {
    this.stepper && this.stepper.next();
    this.stepper1 && this.stepper1.next();
  }

  test({ date, duration }: any) {
    this.router.navigate(['booking'], {
      queryParams: {
        id: this.data.id,
        start_date: date,
        duration,
      },
    });
    this.duration = duration;
  }

  snackBar = (val: string, isGood = false): any =>
    this.SnackBar.open(val, 'Undo', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [!isGood ? 'red-snackbar' : 'green-snackbar'],
    });

  // ngAfterViewInit(): void {
  // this.widget.setCalendarCounts(this.duration);
  // }

  testLogin($event: any) {}
}
