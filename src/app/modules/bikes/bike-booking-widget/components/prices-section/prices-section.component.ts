import {Component, OnInit, Input} from '@angular/core';
import {PricesByDay} from '@shared/helpers/price-helper';

@Component({
  selector: 'lnr-prices-section',
  templateUrl: './prices-section.component.html',
  styleUrls: ['./prices-section.component.scss']
})
export class PricesSectionComponent implements OnInit {
  @Input() prices: PricesByDay;
  constructor() {}

  ngOnInit() {}
}
