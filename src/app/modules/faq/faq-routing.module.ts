import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FaqComponent } from './faq.component';

const routes: Routes = [{ path: '', component: FaqComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class FaqRoutingModule {}
