/* eslint-disable */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import * as fromAuth from '@auth/store/reducers';
import { ApiRidesService } from '@api/api-rides/api-rides.service';
import { BIKE } from '@models/bike/bike.model';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from '@models/user/user';
import { BookWidgetComponent } from '@shared/components/book-widget/book-widget.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  CategoryInterface,
  SubCategoryInterface,
} from '../list-my-bike/model/models';
import { typeList } from '@core/constants/filters.const';
import { STATIC } from './consts/consts';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThreeDSecureComponent } from './components/threeDSecure/threeDSecure.component';
import { loadBike } from '../bike/store/actions';
import { BookingModalComponent } from '../bike/bike-page/booking-modal/booking-modal.component';
import { Location } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
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
export class BikesRequestFlowComponent
  implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  @ViewChild('stepper', STATIC) private stepper: MatStepper;
  @ViewChild('widget', STATIC) private widget: BookWidgetComponent;
  @ViewChild('threeDSecure', STATIC)
  private threeDSecure: ThreeDSecureComponent;

  isLinear = false;
  durationFormGroup: FormGroup;
  signInFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  personalDetailsFormGroup: FormGroup;
  paymentMethodFormGroup: FormGroup;
  rentalOverviewFormGroup: FormGroup;
  data: BIKE | any;
  datesRange = [now, now];
  userSubscriber$;
  bikeCategoryList: Array<CategoryInterface> = typeList;
  type: string;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  user: User | any;
  bike: BIKE | any = new BIKE();
  private destroyed$ = new Subject();
  dialogRef: ElementRef;
  hasInsurance: boolean = true;
  isBikeQueryParams: { [key: string]: any };
  durationStep: boolean = false;
  signInStep: boolean = false;
  allOtherSteps: boolean = false;
  isRequestFlow: boolean = true;
  isLastStep: boolean = false;
  mobileQuery: MediaQueryList;

  constructor(
    private store: Store<fromAuth.State>,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private apiRidesService: ApiRidesService,
    private router: Router,
    private SnackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    private deviceDetectorService: DeviceDetectorService,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    public dialog: MatDialog,
    public Location: Location,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 450px)');
    this.mobileQuery.onchange = () => {
      setTimeout(() => this.setStep(), 0);
    };
  }

  ngOnInit(): void {
    this.getDevices();
    this.setRouterEvents();
    this.getDataUseRout();
  }

  openBookingModal(): void {
    this.dialog.open(BookingModalComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      data: this.data,
    });
  }

  get forSnackData() {
    return {
      dailyPrice: this.data.daily_price,
      weeklyPrice: this.data.weekly_price,
    };
  }

  getType(category: string): void {
    let editSubcategory: SubCategoryInterface;
    const getSubCategory = ({ value }: SubCategoryInterface) =>
      Number(value) === Number(category);
    this.bikeCategoryList.find(i => {
      const findCategory: SubCategoryInterface = i.categories.find(
        getSubCategory,
      );
      if (findCategory) {
        editSubcategory = findCategory;
      }
      return findCategory;
    });
    this.type = (editSubcategory && editSubcategory.text) || '';
  }

  getDataUseRout() {
    this.activateRoute.data
      .pipe(
        map(({ user, bike }) => {
          this.user = user;
          this.userSubscriber$ = this.userStore();
          this.isBikeQueryParams = bike && bike.queryParams;
          return bike;
        }),
        tap(({ id }) => this.store.dispatch(loadBike({ bikeId: id }))),
        takeUntil(this.destroyed$),
      )
      .subscribe(
        next => {
          this.data = next || new BIKE();
          this.getType(this.data.category);
        },
        () => this.snackBar('we have some error'),
      );
  }

  setRouterEvents(): void {
    this.Location.onUrlChange(data => {
      const search = new URLSearchParams(data);
      const query = {
        duration: search.get('duration'),
        start_date: search.get('start_date'),
      };
      this.isBikeQueryParams = { ...query };
      this.setStep();
      this.getDevices();
    });
  }

  userStore() {
    return this.store
      .pipe(select(fromAuth.selectUser), takeUntil(this.destroyed$))
      .subscribe(next => {
        this.user = next;
        this.setStep();
      });
  }

  getDevices() {
    this.isTablet = this.deviceDetectorService.isTablet();
    this.isMobile = this.deviceDetectorService.isMobile();
    this.isDesktop = this.deviceDetectorService.isDesktop();
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  get start_date() {
    return this.isBikeQueryParams && this.isBikeQueryParams.start_date;
  }

  get dateDuration() {
    return this.isBikeQueryParams && this.isBikeQueryParams.duration;
  }

  get importantQuery() {
    return this.start_date && this.dateDuration;
  }

  get insuranceEnabled() {
    return this.user && this.user.has_business && this.user.business
      ? this.user.business.insurance_enabled
      : true;
  }

  get priceForOne() {
    return this.data && this.data.prices[0] && this.data.prices[0].price;
  }

  get weekly() {
    return (
      (this.data && this.data.discounts && this.data.discounts.weekly) || ''
    );
  }

  get daily() {
    return (
      (this.data && this.data.discounts && this.data.discounts.daily) || ''
    );
  }

  setStep() {
    if (this.importantQuery) {
      this.reformatAndSetDate(this.start_date, this.dateDuration);
      if (this.user) {
        let index = 0;
        let results = [];
        const { paymentMethod, hasPhoneNumber, hasAddress } = this.user;
        const variableArray = [
          this.importantQuery,
          this.user,
          hasPhoneNumber,
          hasAddress,
          paymentMethod,
        ];

        variableArray.forEach((item, inx) => {
          results.push(item);
          if (results.every(i => !!i)) {
            index = inx + 1;
            this.stepper.selectedIndex = index;
          }
        });
      } else {
        this.stepper.selectedIndex = 1;
      }
    }
    this.setDataToPage();
  }

  setDataToPage(): void {
    const isUser = this.user || '';
    const hasPhone = (this.user && this.user.hasPhoneNumber) || '';
    const hasAddress = (this.user && this.user.hasAddress) || '';
    const paymentInput =
      this.user && this.user.paymentMethod && 'credit_card_current';

    const duration = {};

    const signIn = {
      sigIn: [isUser, Validators.required],
    };

    const phone = {
      phoneControl: [hasPhone, Validators.required],
    };
    const address = {
      addressControl: [hasAddress, Validators.required],
    };

    const paymentMethod = {
      payment: [paymentInput],
    };

    const bookingOverview = {};

    this.durationFormGroup = this.formBuilder.group(duration);
    this.signInFormGroup = this.formBuilder.group(signIn);
    this.phoneFormGroup = this.formBuilder.group(phone);
    this.personalDetailsFormGroup = this.formBuilder.group(address);
    this.paymentMethodFormGroup = this.formBuilder.group(paymentMethod);
    this.rentalOverviewFormGroup = this.formBuilder.group(bookingOverview);
  }

  // eslint-disable-next-line no-unused-expressions
  next = (e: any): void =>
    this.stepper && this.stepper.selected.completed && this.stepper.next();

  test({ date, duration }: any): void {
    const queryParams = {
      id: this.data.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_date: date,
      duration: duration,
    };
    this.router.navigate(['booking'], { queryParams });
    this.reformatAndSetDate(date, duration);
    this.stepper && (this.stepper.selectedIndex = 1);
    this.widget.refresh();
  }

  /*eslint no-unused-expressions: 2*/
  reformatAndSetDate(start: Date | string = new Date(), duration?): void {
    const arr = [];
    const newDate = new Date(start);
    arr.push(newDate);
    if (duration) {
      const unix = moment.unix(moment(newDate).unix() + Number(duration));
      const dateWithDuration = new Date(unix.toISOString());
      arr.push(dateWithDuration);
    } else {
      arr.push(newDate);
    }
    this.datesRange = arr;
  }

  snackBar = (val: string, isGood = false): object =>
    this.SnackBar.open(val, 'Undo', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [!isGood ? 'red-snackbar' : 'green-snackbar'],
    });

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-unused-expressions
    this.setStep();
    if (this.dateDuration) {
      this.widget && this.widget.setCalendarCounts(this.dateDuration);
    }
    this.cdr.detectChanges();
  }

  requestFlow() {
    if (!this.isLastStep) {
      return this.setStep();
    }
    const request = new FormData();
    const user_id = JSON.stringify(this.user.id);

    request.append('request[ride_id]', this.isBikeQueryParams.id);
    request.append('request[user_id]', user_id);
    request.append('request[start_date]', this.isBikeQueryParams.start_date);
    request.append('request[duration]', this.isBikeQueryParams.duration);
    request.append('request[instant]', 'false');
    request.append('insurance[premium]', 'false');

    this.apiRidesService.bookingBike(request).subscribe(
      req => {
        this.snackBar('Booked successfully', true);

        this.threeDSecure.showThreeDSecureAuthentication(req);
      },
      ({ error }) => {
        const errorFirst = error.errors[0];
        if (errorFirst) {
          this.snackBar(errorFirst.detail, false);
        }
      },
    );
  }

  ngDoCheck(): void {
    this.isLastStep = this.stepper && this.stepper.selectedIndex === 5;
    this.durationStep = !!this.importantQuery;
    this.signInStep = !!this.user || !this.durationStep;
    this.allOtherSteps = !this.durationStep || !this.signInStep;
  }

  ngOnDestroy(): void {}
}
