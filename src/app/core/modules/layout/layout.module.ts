import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {LayoutHeaderComponent} from '@core/modules/layout/layout-header/layout-header.component';
import {LayoutFooterComponent} from '@core/modules/layout/layout-footer/layout-footer.component';
import { InsurancePartnersComponent } from './layout-footer/shared/insurance-partners/insurance-partners.component';
import { SocialMediaBlockComponent } from './layout-footer/shared/social-media-block/social-media-block.component';

const components = [
  LayoutHeaderComponent,
  LayoutFooterComponent,
];

@NgModule({
  declarations: [
    ...components,
    InsurancePartnersComponent,
    SocialMediaBlockComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ...components
  ]
})
export class LayoutModule {

}
