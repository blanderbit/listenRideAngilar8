import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lnr-my-bikes-delete-modal',
  templateUrl: './my-bikes-delete-modal.component.html',
  styleUrls: ['./my-bikes-delete-modal.component.scss'],
})
export class MyBikesDeleteModalComponent {
  constructor(public dialogRef: MatDialogRef<MyBikesDeleteModalComponent>) {}

  submit() {
    this.dialogRef.close({ approved: true });
  }

  close() {
    this.dialogRef.close({ approved: false });
  }
}
