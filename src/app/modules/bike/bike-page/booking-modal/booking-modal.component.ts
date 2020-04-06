import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'lnr-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BookingModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      submitAction: (arg: unknown) => void;
    },
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
