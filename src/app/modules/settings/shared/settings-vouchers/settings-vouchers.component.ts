import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-vouchers',
  templateUrl: './settings-vouchers.component.html',
  styleUrls: ['../settings-form.scss', './settings-vouchers.component.scss']
})
export class SettingsVouchersComponent implements OnInit {
  mode: 'view' | 'update' = 'view';
  form: FormGroup;
  @Input() user: User;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }

  get voucherForm(): AbstractControl | null {
    return this.form.get('voucher');
  }

  private getForm() {
    const formControls = {
      voucher: this.fb.group({
        code: []
      })
    };

    return this.fb.group({
      ...formControls
    });
  }
}
