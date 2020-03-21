import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfig } from '@core/configs/dialog/dialog.config';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { ProfilePictureDialogComponent } from './profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'lnr-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent {
  @Input() editable = false;

  user$ = this.store.pipe(select(fromAuth.selectUser));

  constructor(
    private dialog: MatDialog,
    private store: Store<fromAuth.State>,
  ) {}

  openDialog() {
    if (!this.editable) {
      return;
    }

    const dialogConfig = new DialogConfig();
    this.dialog.open(ProfilePictureDialogComponent, dialogConfig);
  }
}
