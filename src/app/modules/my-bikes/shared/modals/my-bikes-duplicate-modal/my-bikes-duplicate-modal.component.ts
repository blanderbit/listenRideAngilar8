import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lnr-my-bikes-duplicate-modal',
  templateUrl: './my-bikes-duplicate-modal.component.html',
  styleUrls: ['./my-bikes-duplicate-modal.component.scss'],
})
export class MyBikesDuplicateModalComponent {
  bikesCount = 1;

  constructor(
    public dialogRef: MatDialogRef<MyBikesDuplicateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  submit() {
    this.dialogRef.close(this.bikesCount);
  }

  close() {
    this.dialogRef.close();
  }
}
