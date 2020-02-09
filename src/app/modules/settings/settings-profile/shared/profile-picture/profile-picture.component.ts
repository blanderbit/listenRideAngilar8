import {Component, OnInit} from '@angular/core';
import {User} from '@models/user/user';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {ProfilePictureDialogComponent} from './profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'lnr-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  user: User;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('USER'));
    // this.openDialog();
  }

  openDialog() {
    const dialogConfig = new DialogConfig();
    const dialogRef = this.dialog.open(ProfilePictureDialogComponent, dialogConfig);
  }
}
