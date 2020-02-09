import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'lnr-settings-profile-general',
  templateUrl: './settings-profile-general.component.html',
  styleUrls: ['./settings-profile-general.component.scss']
})
export class SettingsProfileGeneralComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

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
      ...formControls
    });
  }

}
