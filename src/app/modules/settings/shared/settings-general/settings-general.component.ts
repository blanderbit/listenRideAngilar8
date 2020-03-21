// TODO Fix to avoid eslint-ignore
/* eslint-disable */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['../settings-form.scss', './settings-general.component.scss'],
})
export class SettingsGeneralComponent implements OnInit {
  form: FormGroup;

  @Input() user: User;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.getForm();
  }

  private getForm() {
    const formControls = {
      first_name: ['test', Validators.required],
      last_name: ['test', Validators.required],
      email: ['vasiliy.test+1@gmail.com', [Validators.required]],
      phone: [''],
      password: ['Test@123', Validators.required],
    };

    return this.fb.group({
      ...formControls,
    });
  }
}
