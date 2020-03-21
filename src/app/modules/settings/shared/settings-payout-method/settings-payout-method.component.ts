import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-payout-method',
  templateUrl: './settings-payout-method.component.html',
  styleUrls: [
    '../settings-form.scss',
    './settings-payout-method.component.scss',
  ],
})
export class SettingsPayoutMethodComponent implements OnInit {
  mode: 'view' | 'update' = 'view';

  form: FormGroup;

  @Input() user: User;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.getForm();
  }

  save() {
    this.openView();
  }

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }

  private getForm(): FormGroup {
    const formControls = {
      test: ['', Validators.required],
    };

    return this.fb.group({
      ...formControls,
    });
  }
}
