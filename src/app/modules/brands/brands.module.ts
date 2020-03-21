import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';

import { TranslateService } from '@ngx-translate/core';
import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';

@NgModule({
  declarations: [BrandsComponent],
  imports: [CommonModule, BrandsRoutingModule, SharedModule],
  entryComponents: [BrandsComponent],
})
export class BrandsModule {
  public constructor(
    private titleService: Title,
    private translate: TranslateService,
    private metaService: Meta,
  ) {
    const title = translate.instant('meta.brands.meta-title');
    const description = translate.instant('meta.brands.meta-description');

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
  }
}
