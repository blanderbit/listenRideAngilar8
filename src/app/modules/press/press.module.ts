import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PressRoutingModule } from './press-routing.module';
import { PressComponent } from './press.component';

@NgModule({
  declarations: [PressComponent],
  imports: [CommonModule, PressRoutingModule, SharedModule],
})
export class PressModule {}
