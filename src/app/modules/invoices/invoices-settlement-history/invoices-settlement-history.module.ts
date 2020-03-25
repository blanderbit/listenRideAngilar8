import { NgModule } from '@angular/core';
import { InvoicesSettlementHistoryComponent } from './invoices-settlement-history.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [InvoicesSettlementHistoryComponent],
  imports: [SharedModule],
  exports: [InvoicesSettlementHistoryComponent],
})
export class InvoicesSettlementHistoryModule {}
