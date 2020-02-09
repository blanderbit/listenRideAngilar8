import {NgModule} from '@angular/core';
import {MenuComponent} from '@core/modules/menu/menu.component';
import {SharedModule} from '../../../shared/shared.module';
import {AuthModule} from '@auth/auth.module';
import {UserVerificationModule} from '@user-verification/user-verification.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    SharedModule,
    AuthModule,
    UserVerificationModule
  ],
  exports: [MenuComponent]
})
export class MenuModule {

}
