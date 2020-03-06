import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ExpandedBikeData} from '@models/bike/bike.types';

@Component({
  selector: 'lnr-booking-snackbar',
  templateUrl: './booking-snackbar.component.html',
  styleUrls: ['./booking-snackbar.component.scss']
})
export class BookingSnackbarComponent {
  @Input()
  bikeData: ExpandedBikeData;

  @Output()
  handleClick = new EventEmitter();

  onAddDatesClick() {
    this.handleClick.emit();
  }
}
