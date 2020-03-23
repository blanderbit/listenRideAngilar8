import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [PrivacyRoutingModule, SharedModule],
})
export class PrivacyModule {}
