import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogSuccessData } from './dialog-success-data';

@Component({
  selector: 'lnr-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss'],
})
export class DialogSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSuccessData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
