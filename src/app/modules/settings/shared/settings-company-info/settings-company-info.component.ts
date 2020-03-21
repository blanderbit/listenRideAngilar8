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
import { ApiUserService } from '@api/api-user/api-user.service';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-company-info',
  templateUrl: './settings-company-info.component.html',
  styleUrls: [
    '../settings-form.scss',
    './settings-company-info.component.scss',
  ],
})
export class SettingsCompanyInfoComponent implements OnInit {
  private destroyed$ = new Subject();

  mode: 'view' | 'update' = 'view';

  @Input() user: User;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
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
    // if (this.form.invalid) {
    // }
    // const street = this.form.get('street').value;
    // const streetNumber = this.form.get('number').value;
    //
    // const locationReq: Partial<User> = {
    //   locations: [
    //     {
    //       ...this.form.value,
    //       street: street && streetNumber ? street + ' ' + streetNumber : street
    //     }
    //   ]
    // };
    //
    // this.apiUserService.update(17289, locationReq)
    //   .subscribe((res) => {
    //   }, (error) => {
    //   });
  }

  get businessForm(): AbstractControl | null {
    return this.form.get('business');
  }

  private getForm() {
    const formControls = {
      business: this.fb.group({
        company_name: ['testCompanyName', Validators.required],
        vat: ['1111', Validators.required],
      }),
    };

    return this.fb.group({
      ...formControls,
    });
  }
}
