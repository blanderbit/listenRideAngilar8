import { NgModule } from '@angular/core';
import { InvoicesAsListerComponent } from './invoices-as-lister.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [InvoicesAsListerComponent],
  imports: [SharedModule],
  exports: [InvoicesAsListerComponent],
})
export class InvoicesAsListerModule {}
