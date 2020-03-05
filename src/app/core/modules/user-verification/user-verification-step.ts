import {MatHorizontalStepper, MatVerticalStepper} from '@angular/material/stepper';
import {MatDialogRef} from '@angular/material/dialog';
import {UserVerificationDialogComponent} from '@user-verification/user-verification-dialog/user-verification-dialog.component';

export abstract class UserVerificationStep {
  // tslint:disable-next-line:variable-name
  private _stepCompleted = false;
  stepper: MatHorizontalStepper | MatVerticalStepper;
  dialogRef: MatDialogRef<UserVerificationDialogComponent>;

  get stepCompleted(): boolean {
    return this._stepCompleted;
  }

  set stepCompleted(complete) {
    this._stepCompleted = complete;
  }

  get isItFirstStep(): boolean {
    if (this.stepper && this.stepper.steps) {
      return this.stepper.steps.first === this.stepper.selected;
    } else {
      return false;
    }
  }

  get isItLastStep(): boolean {
    if (this.stepper && this.stepper.steps) {
      return this.stepper.steps.last === this.stepper.selected;
    } else {
      return true;
    }
  }

  nextOrCloseIfLastStep() {
    return this.stepper.steps.last === this.stepper.selected ? this.closeDialog() : this.stepper.next();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
