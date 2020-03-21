import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RouterModule } from '@angular/router';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxMaskModule } from 'ngx-mask';
import { HttpErrorMessageModule } from '@shared/components/http-error-message/http-error-message.module';
import { ButtonsModule } from '@shared/components/buttons/buttons.module';
import { LoadersModule } from '@shared/components/loader/loaders.module';
import { DividersModule } from '@shared/components/dividers/dividers.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { SocialMediaImgModule } from '@shared/components/social-media-img/social-media-img.module';
import { LinksModule } from '@shared/components/links/links.module';
import { SubscribeInputModule } from '@shared/components/subscribe-input/subscribe-input.module';
import { AddressModule } from '@shared/components/address/address.module';
import { ProfilePictureModule } from '@shared/components/profile-picture/profile-picture.module';
import { PhoneVerificationModule } from '@shared/components/phone-verification/phone-verification.module';
import { OtpVerificationModule } from '@shared/components/otp-verification/otp-verification.module';
import { PaymentMethodCardComponent } from '@shared/components/payment/payment-method-card/payment-method-card.component';
import { PaymentMethodPayPalComponent } from '@shared/components/payment/payment-method-pay-pal/payment-method-pay-pal.component';
import { DialogsModule } from '@shared/dialogs/dialogs.module';
import { TopLocationComponent } from './components/top-location/top-location.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NeedHelpComponent } from './components/need-help/need-help.component';
import { CategoryMultiSelectComponent } from './filters/category-multiselect/category-multi-select.component';
import { BikeCardMobileComponent } from './components/bike-card/bike-card-mobile/bike-card-mobile.component';
import { BikeCardComponent } from './components/bike-card/bike-card.component';
import { MobileSortingComponent } from './components/mobile-sorting/mobile-sorting.component';
import { MaterialModule } from './material/material.module';
import { FiltersComponent } from './filters/filters.component';

import { TestimonialsSwiperComponent } from './components/testimonials-swiper/testimonials-swiper.component';
import { SmallSwiperComponent } from './components/small-swiper/small-swiper.component';
import { TestimonialsSwiperComponent } from './components/testimonials-swiper/testimonials-swiper.component';
import { SmallSwiperComponent } from './components/small-swiper/small-swiper.component';
import { BookWidgetComponent } from '@shared/components/book-widget/book-widget.component';
import { ContentLayoutsModule } from '@shared/components/content-layouts/content-layouts.module';

const components = [
  FiltersComponent,
  MobileSortingComponent,
  CategoryMultiSelectComponent,

  BikeCardComponent,
  BikeCardMobileComponent,
  NeedHelpComponent,
  TopLocationComponent,
  NeedHelpComponent,
  BreadcrumbsComponent,
  PaymentMethodCardComponent,
  PaymentMethodPayPalComponent,
  BreadcrumbsComponent,
  TestimonialsSwiperComponent,
  SmallSwiperComponent,
  BookWidgetComponent
];

const modules = [
  AddressModule,
  HttpErrorMessageModule,
  ButtonsModule,
  LoadersModule,
  DividersModule,
  PipesModule,
  DirectivesModule,
  SocialMediaImgModule,
  LinksModule,
  SubscribeInputModule,
  ProfilePictureModule,
  PhoneVerificationModule,
  OtpVerificationModule,
  DialogsModule,
  ContentLayoutsModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...modules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MaterialModule,
    NgxCaptchaModule,
    TranslateModule,
    RouterModule,
    AgmCoreModule,
    ContentLayoutsModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ...modules,
    ...components,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MaterialModule,
    CreditCardDirectivesModule,
    TranslateModule
  ],
})
export class SharedModule {}
