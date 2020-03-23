import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';

@NgModule({
  declarations: [TermsComponent],
  imports: [SharedModule, TermsRoutingModule],
})
export class TermsModule {}
