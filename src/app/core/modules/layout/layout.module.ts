import { NgModule } from '@angular/core';
import { LayoutHeaderComponent } from '@core/modules/layout/layout-header/layout-header.component';
import { LayoutFooterComponent } from '@core/modules/layout/layout-footer/layout-footer.component';
import { LayoutHeaderMenuComponent } from '@core/modules/layout/layout-header/layout-header-menu/layout-header-menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { SocialMediaImgModule } from '@shared/components/social-media-img/social-media-img.module';
import { LinksModule } from '@shared/components/links/links.module';
import { SubscribeInputModule } from '@shared/components/subscribe-input/subscribe-input.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { SelectLanguageComponent } from './layout-footer/shared/select-language/select-language.component';
import { SocialMediaBlockComponent } from './layout-footer/shared/social-media-block/social-media-block.component';
import { InsurancePartnersComponent } from './layout-footer/shared/insurance-partners/insurance-partners.component';

const components = [
  LayoutHeaderComponent,
  LayoutFooterComponent,
  InsurancePartnersComponent,
  SocialMediaBlockComponent,
  SelectLanguageComponent,
  LayoutHeaderMenuComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatGoogleMapsAutocompleteModule,
    TranslateModule,
    SocialMediaImgModule,
    LinksModule,
    SubscribeInputModule,
    PipesModule,
  ],
  exports: [...components],
})
export class LayoutModule {}
