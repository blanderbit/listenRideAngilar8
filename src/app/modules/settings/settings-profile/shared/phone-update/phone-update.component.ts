import {Component} from '@angular/core';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {MatDialog} from '@angular/material/dialog';
import {PhoneUpdateDialogComponent} from './phone-update-dialog/phone-update-dialog.component';

@Component({
  selector: 'lnr-phone-update',
  templateUrl: './phone-update.component.html',
  styleUrls: ['./phone-update.component.scss']
})
export class PhoneUpdateComponent {

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogConfig = new DialogConfig('400px');
    const dialogRef = this.dialog.open(PhoneUpdateDialogComponent, dialogConfig);
  }
}
