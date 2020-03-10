import {NgModule} from '@angular/core';
import {DividerComponent} from '@shared/components/dividers/divider/divider.component';
import {MatDividerModule} from '@angular/material/divider';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DividerComponent],
  imports: [CommonModule, MatDividerModule],
  exports: [DividerComponent]
})
export class DividersModule {

}
