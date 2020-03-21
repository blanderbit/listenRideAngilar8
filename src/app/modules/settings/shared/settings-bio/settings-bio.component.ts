// TODO Fix to avoid eslint-ignore
/* eslint-disable */
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiBusinessService } from '@api/api-business/api-business.service';
import { Business } from '@models/business/business';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-bio',
  templateUrl: './settings-bio.component.html',
  styleUrls: ['../settings-form.scss', './settings-bio.component.scss'],
})
export class SettingsBioComponent implements OnInit {
  private destroyed$ = new Subject();

  mode: 'view' | 'update' = 'view';

  @Input() user: User;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiBusinessService: ApiBusinessService,
  ) {}

  ngOnInit(): void {
    this.form = this.getForm();
  }

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const business: { business: Partial<Business> } = { ...this.form.value };

    // TODO Fix this test (?!!) calss
    this.apiBusinessService.update(827, business).subscribe(
      res => {},
      error => {},
    );
  }

  get businessForm(): AbstractControl | null {
    return this.form.get('business');
  }

  private getForm() {
    const formControls = {
      business: this.fb.group({
        vat: ['vat', [Validators.required]],
      }),
    };

    return this.fb.group({
      ...formControls,
    });
  }
}
