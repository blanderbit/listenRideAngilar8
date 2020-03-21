import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from '@api/api-user/api-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorsLnr } from '@validators/validators-lnr';
import { passwordTips } from './password-tips.config';

@Component({
  selector: 'lnr-password-update-dialog',
  templateUrl: './password-update-dialog.component.html',
  styleUrls: ['./password-update-dialog.component.scss'],
})
export class PasswordUpdateDialogComponent implements OnInit {
  form: FormGroup;

  error: HttpErrorResponse;

  passwordVisible = false;

  oldPasswordVisible = false;

  passwordTips = passwordTips;

  constructor(
    public dialogRef: MatDialogRef<PasswordUpdateDialogComponent>,
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
  ) {}

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
    const { errors } = this.form.get('password');

    return (
      !errors ||
      (!!errors &&
        !errors.required &&
        (!errors.format || !errors.format[ruleName]))
    );
  }

  close() {
    this.dialogRef.close();
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
          ValidatorsLnr.passwordValidator,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    };

    return this.fb.group(
      {
        ...formControls,
      },
      {
        validator: ValidatorsLnr.passwordsMatchValidator,
      },
    );
  }
}
