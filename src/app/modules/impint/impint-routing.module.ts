import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpintComponent } from './impint.component';

const routes: Routes = [{ path: '', component: ImpintComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpintRoutingModule {}
