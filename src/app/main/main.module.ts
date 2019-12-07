import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main.component';
import {StoreModule} from "@ngrx/store";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forFeature('main', {}),
  ],
})
export class MainModule { }
