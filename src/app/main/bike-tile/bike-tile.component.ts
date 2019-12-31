import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bike-tile',
  templateUrl: './bike-tile.component.html',
  styleUrls: ['./bike-tile.component.scss']
})
export class BikeTileComponent implements OnInit {
  @Input() image = '';
  @Input() brand = '';
  @Input() bikeName = '';
  @Input() size = '';
  @Input() price = '';
  @Input() rating = '';
  @Input() distance = '';
  @Input() bikeHeight = '';
  @Input() amount = 0;
  @Input() clusterParams = {};

  constructor() {
  }

  ngOnInit() {
  }

}
