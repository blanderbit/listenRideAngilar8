import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiUserService} from '@api/api-user/api-user.service';
import {ValidatorsLnr} from '@validators/validators-lnr';
import {passwordTips} from './password-tips.config';

@Component({
  selector: 'lnr-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
  form: FormGroup;
  error: HttpErrorResponse;
  passwordVisible = false;
  oldPasswordVisible = false;
  passwordTips = passwordTips;

  constructor(
    private fb: FormBuilder,
    private apiUserService: ApiUserService
  ) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  toggleOldPasswordVisibility() {
    this.oldPasswordVisible = !this.oldPasswordVisible;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  doesPasswordMeetsRule(ruleName: string) {
    const errors = this.form.get('password').errors;

    return (
      !errors || (!!errors && !errors.required && (!errors.format || !errors.format[ruleName]))
    );
  }

  private getForm() {
    const formControls = {
      oldPassword: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          ValidatorsLnr.passwordValidator
        ]
      ],
      confirmPassword: ['', [Validators.required]]
    };

    return this.fb.group({
      ...formControls
    }, {
      validator: ValidatorsLnr.passwordsMatchValidator
    });
  }
}
