import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forFeature('main', {}),
  ],
  exports: [],
})
export class MainModule { }
