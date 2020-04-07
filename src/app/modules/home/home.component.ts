import { Component, OnInit } from '@angular/core';
import { imagesAmazonFolder } from '@core/constants/external-path';
import random from 'lodash-es/random';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestsThreeDSecureComponent } from './components/requests-three-dsecure/requests-three-dsecure.component';

@Component({
  selector: 'lnr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heroShotUrl: string;

  constructor(
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
  ) {}

  pickRandomHeroshot() {
    const heroShotId = random(1, 6);
    this.heroShotUrl = `${imagesAmazonFolder}/home/hero/lnr_hero_${heroShotId}.jpg`;
  }

  ngOnInit() {
    this.pickRandomHeroshot();
    if (
      !!this.activateRoute.snapshot.params.id &&
      !!this.activateRoute.snapshot.queryParams.succeed
    ) {
      this.openDialog(this.activateRoute.snapshot);
    }
  }

  openDialog(data) {
    this.dialog.open(RequestsThreeDSecureComponent, {
      width: '45rem',
      height: '28rem',
      data: data,
    });
  }
}
