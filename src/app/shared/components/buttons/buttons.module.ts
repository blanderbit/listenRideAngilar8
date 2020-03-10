import {NgModule} from '@angular/core';
import {ButtonCloseComponent} from '@shared/components/buttons/button-close/button-close.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ButtonCloseComponent],
  imports: [MatIconModule],
  exports: [ButtonCloseComponent]
})
export class ButtonsModule {

}
