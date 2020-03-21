import { NgModule } from '@angular/core';
import { LoaderSpinnerSmallComponent } from '@shared/components/loader/loader-spinner-small/loader-spinner-small.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LoaderSpinnerSmallComponent],
  imports: [MatIconModule],
  exports: [LoaderSpinnerSmallComponent],
})
export class LoadersModule {}
