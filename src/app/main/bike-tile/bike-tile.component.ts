import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-bike-tile',
  templateUrl: './bike-tile.component.html',
  styleUrls: ['./bike-tile.component.scss']
})
export class BikeTileComponent implements OnInit {
  @Input() image = '';
  @Input() brand = '';
  @Input() bikeName = '';
  @Input() size = '';
  @Input() price: number;
  @Input() weeklyPrice: number;
  @Input() rating: number;
  @Input() ratingAverage: number;
  @Input() distance = '';
  @Input() amount = 0;
  @Input() clusterParams = {};
  @Input() isMobileMap = false;
  @Input() isMapView = false;
  @Input() isMobileView = true;

  constructor() {
  }

  ngOnInit() {
  }

}
