import { MatDialogConfig } from '@angular/material';

export class DialogConfig extends MatDialogConfig {
  autoFocus = true;

  constructor(width = '760px', data: any = null) {
    super();
    this.width = width;
    this.data = data;
  }

  setDisableClose(): DialogConfig {
    this.disableClose = true;
    return this;
  }
}
