import { NgModule } from '@angular/core';
import { InvoicesAsRiderComponent } from './invoices-as-rider.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [InvoicesAsRiderComponent],
  imports: [SharedModule],
  exports: [InvoicesAsRiderComponent],
})
export class InvoicesAsRiderModule {}
