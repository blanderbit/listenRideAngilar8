import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { ImpintRoutingModule } from './impint-routing.module';
import { ImpintComponent } from './impint.component';

@NgModule({
  declarations: [ImpintComponent],
  imports: [CommonModule, ImpintRoutingModule, SharedModule],
})
export class ImpintModule {}
