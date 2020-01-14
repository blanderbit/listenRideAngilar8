import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import { FiltersComponent } from './filters/filters.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {FiltersComponent} from './filters/filters.component';
import {DividerComponent} from './components/dividers/divider/divider.component';
import {LoaderSpinnerSmallComponent} from './components/loader/loader-spinner-small/loader-spinner-small.component';
import {HttpErrorMessageComponent} from './components/http-error-message/http-error-message.component';
import {CheckboxSubscribeToNewsletterComponent} from './components/form-controls/checkboxes/checkbox-subscribe-to-newsletter/checkbox-subscribe-to-newsletter.component';
import {CheckboxTermsAndConditionsComponent} from './components/form-controls/checkboxes/checkbox-terms-and-conditions/checkbox-terms-and-conditions.component';
import {ButtonCloseComponent} from './components/buttons/button-close/button-close.component';
import {LinkComponent} from './components/links/link/link.component';
import {LinkListComponent} from './components/links/link-list/link-list.component';
import {AutofocusDirective} from './directives/autofocus.directive';
import {FocusFirstInvalidFieldDirective} from './directives/focus-first-invalid-field.directive';
import {MaterialModule} from './modules/material/material.module';
import {NgxCaptchaModule} from 'ngx-captcha';

const components = [
  FiltersComponent,
  DividerComponent,
  LoaderSpinnerSmallComponent,
  HttpErrorMessageComponent,
];

const formControls = [
  CheckboxSubscribeToNewsletterComponent,
  CheckboxTermsAndConditionsComponent
];

const buttons = [
  ButtonCloseComponent
];

const links = [
  LinkComponent,
  LinkListComponent
];

const directives = [
  AutofocusDirective,
  FocusFirstInvalidFieldDirective
];

@NgModule({
  declarations: [
    ...components,
    ...formControls,
    ...buttons,
    ...links,
    ...directives
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MaterialModule,
    NgxCaptchaModule,
  ],
  exports: [
    ...components,
    ...formControls,
    ...buttons,
    ...links,
    ...directives,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MaterialModule,
  ],
  entryComponents: []
})
export class SharedModule {
}
