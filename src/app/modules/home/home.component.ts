import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroShotUrl: string;


  pickRandomHeroshot() {
    const heroShotId = Math.floor(Math.random() * Math.floor(4)) + 1;
    this.heroShotUrl = '../../../assets/images/img-home/hero/lnr_hero_' + heroShotId + '.jpg';
  }

  ngOnInit() {
    this.pickRandomHeroshot();
  }

}
