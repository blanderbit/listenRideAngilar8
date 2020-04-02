import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpandedBikeData } from '@models/bike/bike.types';
import {
  getStaticMapSrc,
  getAccessoryImage,
  AccessoryImage,
} from '@shared/helpers';
import { MatDialog } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { URL_DATE_FORMAT } from '@core/constants/time';
import { User } from '@models/user/user';
import * as fromAuth from '@auth/store/reducers';
import { UserVerificationActions } from '@user-verification/store/actions';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { MetaData } from './types';
import { BikeState } from '../types';
import { selectCurrentBikeData } from '../store';
import { loadBike } from '../store/actions';
import { BookingSubmit } from '../bike-booking-widget/types';

@Component({
  selector: 'lnr-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
})
export class BikeComponent implements OnInit {
  public bikeData$: Observable<ExpandedBikeData>;

  public bikeData: ExpandedBikeData;

  private user$: Observable<Partial<User>>;

  public staticMapSrc: string;

  public accessoriesImages: Array<AccessoryImage>;

  // eslint-disable-next-line global-require
  public SECURE_IMAGE = require('assets/images/icons/home/rent-secure.svg');

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private titleService: Title,
    private translate: TranslateService,
    private metaService: Meta,
    private store: Store<BikeState>,
    private authStore: Store<fromAuth.State>,
    private router: Router,
  ) {
    this.user$ = authStore.select(fromAuth.selectUser);
    this.bikeData$ = this.store.select(selectCurrentBikeData);
  }

  openBookingModal(): void {
    this.dialog.open(BookingModalComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      data: this.bikeData,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ bikeId }) => {
      this.store.dispatch(loadBike({ bikeId }));
    });

    this.bikeData$.subscribe(data => {
      if (data) {
        const { accessories, latRnd, lngRnd } = data;

        this.bikeData = data;
        this.staticMapSrc = getStaticMapSrc(latRnd, lngRnd);
        this.accessoriesImages = Object.keys(accessories).map(
          getAccessoryImage,
        );
        this.setMetaTags();
      }
    });
    this.user$.subscribe(user => {
      // if (user && (!user.confirmedEmail || !user.confirmedPhone)) {
      //   this.store.dispatch(
      //     UserVerificationActions.openUserVerificationDialogFromListBike(),
      //   );
      // }
    });
  }

  setMetaTags(): void {
    const { description, city, name, brand, subcategory } = this.bikeData;
    const metaData: MetaData = {
      name,
      brand,
      category: subcategory.text,
      location: city,
    };

    this.titleService.setTitle(
      this.translate.instant('bike.meta-title', metaData),
    );
    this.metaService.updateTag({
      name: 'description',
      content: description,
    });
  }

  navigateToRequestFlow(selectedDates: BookingSubmit): void {
    const { startDate, endDate } = selectedDates;
    const startDateString = moment(startDate).format(URL_DATE_FORMAT);
    const duration = moment(endDate).diff(moment(startDate), 'seconds');

    this.router.navigateByUrl(
      `/booking?id=${this.bikeData.id}&start_date=${startDateString}&duration=${duration}`,
    );
  }
}
