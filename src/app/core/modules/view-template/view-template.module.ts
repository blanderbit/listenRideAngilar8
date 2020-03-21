import { NgModule } from '@angular/core';
import { ViewTemplateStatusComponent } from '@core/modules/view-template/view-template-status/view-template-status.component';
import { CommonModule } from '@angular/common';

const components = [ViewTemplateStatusComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class ViewTemplateModule {}
