import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lnr-requests-three-dsecure',
  templateUrl: './requests-three-dsecure.component.html',
  styleUrls: ['./requests-three-dsecure.component.scss'],
})
export class RequestsThreeDSecureComponent {
  requestId: string;
  succeed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RequestsThreeDSecureComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.requestId = data && data.params && data.params.id;
    this.succeed =
      data && data.queryParams && JSON.parse(data.queryParams.succeed);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
