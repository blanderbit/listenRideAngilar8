import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {LayoutHeaderComponent} from '@core/modules/layout/layout-header/layout-header.component';
import {LayoutFooterComponent} from '@core/modules/layout/layout-footer/layout-footer.component';
import { InsurancePartnersComponent } from './layout-footer/shared/insurance-partners/insurance-partners.component';
import { SocialMediaBlockComponent } from './layout-footer/shared/social-media-block/social-media-block.component';
import { SelectLanguagesComponent } from './layout-footer/shared/select-languages/select-languages.component';

const components = [
  LayoutHeaderComponent,
  LayoutFooterComponent,
  InsurancePartnersComponent,
  SocialMediaBlockComponent,
  SelectLanguagesComponent
];

@NgModule({
  declarations: [
    ...components
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
