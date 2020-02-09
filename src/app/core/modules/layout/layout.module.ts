import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {LayoutHeaderComponent} from '@core/modules/layout/layout-header/layout-header.component';
import {LayoutFooterComponent} from '@core/modules/layout/layout-footer/layout-footer.component';
import {InsurancePartnersComponent} from './layout-footer/shared/insurance-partners/insurance-partners.component';
import {SocialMediaBlockComponent} from './layout-footer/shared/social-media-block/social-media-block.component';
import {SelectLanguageComponent} from './layout-footer/shared/select-language/select-language.component';
import {MenuModule} from '@core/modules/menu/menu.module';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

const components = [
  LayoutHeaderComponent,
  LayoutFooterComponent,
  InsurancePartnersComponent,
  SocialMediaBlockComponent,
  SelectLanguageComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    SharedModule,
    MatGoogleMapsAutocompleteModule,
    MenuModule
  ],
  exports: [
    ...components
  ]
})
export class LayoutModule {

}
