import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HelpComponent } from './help.component';

const routes: Routes = [{ path: '', component: HelpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class HelpRoutingModule {}
