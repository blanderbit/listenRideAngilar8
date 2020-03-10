import {NgModule} from '@angular/core';
import {HttpErrorMessageComponent} from '@shared/components/http-error-message/http-error-message.component';

@NgModule({
  declarations: [HttpErrorMessageComponent],
  exports: [HttpErrorMessageComponent]
})
export class HttpErrorMessageModule {

}
