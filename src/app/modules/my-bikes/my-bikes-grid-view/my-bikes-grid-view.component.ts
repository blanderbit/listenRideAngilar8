import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Bike} from '@models/bike/bike.types';
import {Observable} from 'rxjs';

@Component({
  selector: 'lnr-my-bikes-grid-view',
  templateUrl: './my-bikes-grid-view.component.html',
  styleUrls: ['./my-bikes-grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyBikesGridViewComponent implements OnInit {

  @Input() bikes$: Observable<Bike[]>;

  constructor() { }

  ngOnInit() {
    this.bikes$.subscribe(b => console.log(b));
  }

}
