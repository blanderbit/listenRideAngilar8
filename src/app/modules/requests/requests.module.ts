import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { UserResolver } from '@modules/bikes-request-flow/service/user-resolver';
import { BikeResolver } from '@modules/bikes-request-flow/service/bike-resolver';
import { RequestsRoutingModule } from '@modules/requests/requests-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [RequestsComponent],
  imports: [RequestsRoutingModule, SharedModule, CommonModule],
  providers: [UserResolver, BikeResolver],
  entryComponents: [RequestsComponent],
})
export class RequestsModule {}
