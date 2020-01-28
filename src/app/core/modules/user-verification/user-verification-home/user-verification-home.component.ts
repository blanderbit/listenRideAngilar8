import {Component, Input} from '@angular/core';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'lnr-user-verification-home',
  templateUrl: './user-verification-home.component.html',
  styleUrls: ['./user-verification-home.component.scss']
})
export class UserVerificationHomeComponent {
  @Input() stepper: MatHorizontalStepper;

  close() {

  }
}
