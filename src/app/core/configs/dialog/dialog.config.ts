import {MatDialogConfig} from '@angular/material';

export class DialogConfig extends MatDialogConfig {
  autoFocus = true;

  constructor(width: string = '760px') {
    super();
    this.width = width;
  }

  setDisableClose(): DialogConfig {
    this.disableClose = true;
    return this;
  }

}
