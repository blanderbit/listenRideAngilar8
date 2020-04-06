import { NgModule } from '@angular/core';
import { CurrencyCustomPipe } from '@shared/pipes/currency.custom.pipe';
import { ProfilePicturePipe } from '@shared/pipes/profile-picture.pipe';
import { ReplaceSpaceToDashPipe } from '@shared/pipes/replace-space-to-dash.pipe';
import { StringPipe } from '@shared/pipes/string.pipe';
import { PhonePipe } from '@shared/pipes/phone.pipe';
import { StripHtmlPipe } from '@shared/pipes/strip-html.pipe';

const pipes = [
  CurrencyCustomPipe,
  PhonePipe,
  ProfilePicturePipe,
  ReplaceSpaceToDashPipe,
  StringPipe,
  StripHtmlPipe,
];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class PipesModule {}
