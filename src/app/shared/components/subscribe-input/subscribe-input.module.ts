import {NgModule} from '@angular/core';
import {SubscribeInputComponent} from '@shared/components/subscribe-input/subscribe-input.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [SubscribeInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [SubscribeInputComponent]
})
export class SubscribeInputModule {

}
