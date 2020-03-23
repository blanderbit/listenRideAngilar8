import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BrandTemplateRoutingModule } from './brand-template-routing.module';
import { BrandTemplateComponent } from './brand-template.component';
import { BrandTemplateWelcomeScreenComponent } from './shared/brand-template-welcome-screen/brand-template-welcome-screen.component';
import { BrandTemplateBikeListComponent } from './shared/brand-template-bike-list/brand-template-bike-list.component';

@NgModule({
  declarations: [
    BrandTemplateComponent,
    BrandTemplateWelcomeScreenComponent,
    BrandTemplateBikeListComponent,
  ],
  imports: [CommonModule, SharedModule, BrandTemplateRoutingModule],
})
export class BrandTemplateModule {}
