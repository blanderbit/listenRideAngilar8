import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {FiltersComponent} from './filters/filters.component';
import {DividerComponent} from './components/dividers/divider/divider.component';
import {LoaderSpinnerSmallComponent} from './components/loader/loader-spinner-small/loader-spinner-small.component';
import {HttpErrorMessageComponent} from './components/http-error-message/http-error-message.component';
import {ButtonCloseComponent} from './components/buttons/button-close/button-close.component';
import {LinkComponent} from './components/links/link/link.component';
import {LinkListComponent} from './components/links/link-list/link-list.component';
import {AutofocusDirective} from './directives/autofocus.directive';
import {FocusFirstInvalidFieldDirective} from './directives/focus-first-invalid-field.directive';
import {MaterialModule} from './modules/material/material.module';
import {NgxCaptchaModule} from 'ngx-captcha';
import {SocialMediaImgComponent} from './components/social-media-img/social-media-img.component';
import {SubscribeInputComponent} from './components/subscribe-input/subscribe-input.component';
import {MobileSortingComponent} from './components/mobile-sorting/mobile-sorting.component';
import {BikeCardComponent} from './components/bike-card/bike-card.component';
import {BikeCardMobileComponent} from './components/bike-card/bike-card-mobile/bike-card-mobile.component';
import {RouterModule} from '@angular/router';
import {CategoryMultiSelectComponent} from './filters/category-multiselect/category-multi-select.component';
import {CreditCardDirectivesModule} from 'angular-cc-library';
import {StringPipe} from './pipes/string.pipe';
import {Phone} from './pipes/phone.pipe';
import {NeedHelpComponent} from './components/need-help/need-help.component';
import {ReplaceSpaceToDashPipe} from './pipes/replace-space-to-dash.pipe';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {TopLocationComponent} from './components/top-location/top-location.component';
import {MbscFormsModule} from '@mobiscroll/angular';
import {CurrencyCustomPipe} from '@shared/pipes/currency.custom.pipe';
import {ProfilePicturePipe} from './pipes/profile-picture.pipe';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ProfilePictureComponent} from './components/profile-picture/profile-picture.component';
import {ProfilePictureDialogComponent} from './components/profile-picture/profile-picture-dialog/profile-picture-dialog.component';
import {DialogSuccessComponent} from './dialogs/dialog-success/dialog-success.component';
import {ProfilePictureEditorComponent} from './components/profile-picture/profile-picture-editor/profile-picture-editor.component';
import {PhoneVerificationComponent} from './components/phone-verification/phone-verification.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {OtpVerificationComponent} from './components/otp-verification/otp-verification.component';
import {AddressComponent} from './components/address/address.cpmponent';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {NgxMaskModule} from 'ngx-mask';

import {TestimonialsSwiperComponent} from './components/testimonials-swiper/testimonials-swiper.component';
import {SmallSwiperComponent} from './components/small-swiper/small-swiper.component';

const components = [
  AddressComponent,
  FiltersComponent,
  DividerComponent,
  LoaderSpinnerSmallComponent,
  HttpErrorMessageComponent,
  SocialMediaImgComponent,
  SubscribeInputComponent,
  MobileSortingComponent,
  CategoryMultiSelectComponent,

  BikeCardComponent,
  BikeCardMobileComponent,
  NeedHelpComponent,
  TopLocationComponent,
  NeedHelpComponent,
  ProfilePictureComponent,
  ProfilePictureEditorComponent,
  PhoneVerificationComponent,
  OtpVerificationComponent,
  BreadcrumbsComponent,
  TestimonialsSwiperComponent,
  SmallSwiperComponent
];

const dialogs = [
  DialogSuccessComponent,
  ProfilePictureDialogComponent
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

const pipes = [
  StringPipe,
  Phone,
  ReplaceSpaceToDashPipe,
  ProfilePicturePipe,
  ReplaceSpaceToDashPipe,
  CurrencyCustomPipe
];

@NgModule({
  declarations: [
    ...components,
    ...buttons,
    ...links,
    ...directives,
    ...pipes,
    ...dialogs
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MaterialModule,
    NgxCaptchaModule,
    TranslateModule,
    RouterModule,
    TranslateModule,
    ImageCropperModule,
    NgxIntlTelInputModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaskModule.forRoot(),
    MbscFormsModule
  ],
  exports: [
    ...components,
    ...buttons,
    ...links,
    ...directives,
    ...pipes,
    ...dialogs,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MaterialModule,
    SocialMediaImgComponent,
    SubscribeInputComponent,
    CreditCardDirectivesModule,
    TranslateModule,
    BreadcrumbsComponent,
    TestimonialsSwiperComponent,
    SmallSwiperComponent,
  ],
  entryComponents: [
    ...dialogs
  ]
})
export class SharedModule {
}
