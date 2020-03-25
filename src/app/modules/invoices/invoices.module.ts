import { NgModule } from '@angular/core';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesAsListerModule } from './invoices-as-lister';
import { InvoicesAsRiderModule } from './invoices-as-rider';
import { InvoicesSettlementHistoryModule } from './invoices-settlement-history';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    InvoicesRoutingModule,
    InvoicesAsListerModule,
    InvoicesAsRiderModule,
    InvoicesSettlementHistoryModule,
    SharedModule,
  ],
})
export class InvoicesModule {}
