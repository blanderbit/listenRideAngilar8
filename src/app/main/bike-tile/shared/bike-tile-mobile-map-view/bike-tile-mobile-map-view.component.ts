import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-bike-tile-mobile-map-view',
  templateUrl: './bike-tile-mobile-map-view.component.html',
  styleUrls: ['./bike-tile-mobile-map-view.component.scss']
})
export class BikeTileMobileMapViewComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
  }

}
