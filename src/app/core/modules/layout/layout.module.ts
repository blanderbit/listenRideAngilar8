import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {LayoutHeaderComponent} from '@core/modules/layout/layout-header/layout-header.component';
import {LayoutFooterComponent} from '@core/modules/layout/layout-footer/layout-footer.component';

const components = [
  LayoutHeaderComponent,
  LayoutFooterComponent,
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
