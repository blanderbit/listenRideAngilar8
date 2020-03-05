import {NgModule} from '@angular/core';
import {TermsComponent} from './terms.component';
import {TermsRoutingModule} from './terms-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    SharedModule,
    TermsRoutingModule
  ]
})
export class TermsModule {

}
