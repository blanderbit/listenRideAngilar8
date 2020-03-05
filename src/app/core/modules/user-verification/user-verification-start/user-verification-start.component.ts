import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatHorizontalStepper, MatVerticalStepper} from '@angular/material/stepper';
import {User} from '@models/user/user';
import {MatDialogRef} from '@angular/material/dialog';
import {UserVerificationDialogComponent} from '@user-verification/user-verification-dialog/user-verification-dialog.component';
import {Address} from '@models/user/address';

@Component({
  selector: 'lnr-user-verification-start',
  templateUrl: './user-verification-start.component.html',
  styleUrls: ['../user-verification.scss', './user-verification-start.component.scss']
})
export class UserVerificationStartComponent {
  @Input() dialogRef: MatDialogRef<UserVerificationDialogComponent>;
  @Input() isDesktop = true;
  @Input() isTablet = false;
  @Input() isMobile = false;
  @Input() user: User;
  @Output() letsStart = new EventEmitter<boolean>();

  start() {
    this.letsStart.emit(true);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
