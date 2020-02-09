import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {PasswordUpdateDialogComponent} from './password-update-dialog/password-update-dialog.component';

@Component({
  selector: 'lnr-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent {
  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogConfig = new DialogConfig('400px');
    const dialogRef = this.dialog.open(PasswordUpdateDialogComponent, dialogConfig);
  }
}
