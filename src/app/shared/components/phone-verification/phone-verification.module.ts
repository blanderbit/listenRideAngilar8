import {NgModule} from '@angular/core';
import {PhoneVerificationComponent} from '@shared/components/phone-verification/phone-verification.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PhoneVerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule
  ],
  exports: [PhoneVerificationComponent]
})
export class PhoneVerificationModule {

}
