import {Component, Input} from '@angular/core';

@Component({
  selector: 'lnr-auth-forgot-password-button',
  templateUrl: './auth-forgot-password-button.component.html',
  styleUrls: ['../../shared/button.scss', './auth-forgot-password-button.component.scss']
})
export class AuthForgotPasswordButtonComponent {
  @Input() text = 'Forgot password?';
  @Input() disabled = false;
}
