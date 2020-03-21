import { Component, OnInit } from '@angular/core';
import random from 'lodash-es/random';

@Component({
  selector: 'lnr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heroShotUrl: string;

  pickRandomHeroshot() {
    const heroShotId = random(1, 6);
    this.heroShotUrl = `../../../assets/images/img-home/hero/lnr_hero_${heroShotId}.jpg`;
  }

  ngOnInit() {
    this.pickRandomHeroshot();
  }
}
