import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {Business} from '@models/business/business';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'lnr-user-verification-vat',
  templateUrl: './user-verification-vat.component.html',
  styleUrls: ['./user-verification-vat.component.scss']
})
export class UserVerificationVatComponent implements OnInit {
  private destroyed$ = new Subject();
  @Input() stepper: MatHorizontalStepper;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private apiBusinessService: ApiBusinessService) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const business: { business: Partial<Business> } = {...this.form.value};

    this.apiBusinessService.update(827, business)
      .subscribe((res) => {
      }, (error) => {
      });
  }

  get businessForm(): AbstractControl | null {
    return this.form.get('business');
  }

  private getForm() {
    const formControls = {
      business: this.fb.group(
        {
          vat: ['vat', [Validators.required]],
        }
      ),
    };

    return this.fb.group({
      ...formControls
    });
  }
}
