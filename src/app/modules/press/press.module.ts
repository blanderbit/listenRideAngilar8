import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressRoutingModule } from './press-routing.module';
import { PressComponent } from './press.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PressComponent],
  imports: [CommonModule, PressRoutingModule, SharedModule],
})
export class PressModule {}
