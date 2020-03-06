import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExpandedBikeData} from '@models/bike/bike.types';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {
  getStaticMapSrc,
  getAccessoryImage,
  AccessoryImage
} from '@shared/helpers';
import {MatDialog} from '@angular/material';
import {BookingModalComponent} from './booking-modal/booking-modal.component';
import {Meta, Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {MetaData} from './types';

@Component({
  selector: 'lnr-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikeComponent implements OnInit {
  public bikeData: ExpandedBikeData;
  public staticMapSrc: string;
  public accessoriesImages: Array<AccessoryImage>;
  public SECURE_IMAGE = require('assets/images/img-home/Icon_rent-secure 1.svg');
  public isInsuranceIncluded: boolean;

  constructor(
    private route: ActivatedRoute,
    private ridesService: ApiRidesService,
    public dialog: MatDialog,
    private titleService: Title,
    private translate: TranslateService,
    private metaService: Meta,
    private router: Router
  ) {}

  openBookingModal(): void {
    this.dialog.open(BookingModalComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      data: this.bikeData
    });
  }

  ngOnInit() {
    this.route.params.subscribe(({bikeId}) => {
      this.ridesService.getExpandedBikeData(bikeId).subscribe(data => {
        const {accessories, latRnd, lngRnd, countryCode} = data;

        this.bikeData = data;
        this.staticMapSrc = getStaticMapSrc(latRnd, lngRnd);
        this.accessoriesImages = Object.keys(accessories).map(
          getAccessoryImage
        );
        this.isInsuranceIncluded = countryCode === 'DE' || countryCode === 'AT';
        this.setMetaTags();
      }, error => {
        this.router.navigate(['404']);
      });
    });
  }

  setMetaTags() {
    const {description, city, name, brand, subcategory} = this.bikeData;
    const metaData: MetaData = {
      name,
      brand,
      category: subcategory.text,
      location: city
    };

    this.titleService.setTitle(
      this.translate.instant('bike.meta-title', metaData)
    );
    this.metaService.updateTag({
      name: 'description',
      content: description
    });
  }
}
