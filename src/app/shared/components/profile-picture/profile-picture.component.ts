import {Component, Input, OnInit} from '@angular/core';
import {User} from '@models/user/user';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {ProfilePictureDialogComponent} from './profile-picture-dialog/profile-picture-dialog.component';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';

@Component({
  selector: 'lnr-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent {
  @Input() editable = false;
  user$ = this.store.pipe(select(fromAuth.selectAuthGetUser));

  constructor(private dialog: MatDialog,
              private store: Store<fromAuth.State>) {
  }

  openDialog() {
    if (!this.editable) {
      return;
    }

    const dialogConfig = new DialogConfig();
    this.dialog.open(ProfilePictureDialogComponent, dialogConfig);
  }
}
