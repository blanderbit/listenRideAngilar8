import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ExpandedBikeData} from '@models/bike/bike.types';

@Component({
  selector: 'lnr-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpandedBikeData
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
