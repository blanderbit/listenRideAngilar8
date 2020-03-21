import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandTemplateComponent } from './brand-template.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../brands/brands.module').then(m => m.BrandsModule),
  },
  { path: ':name', component: BrandTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandTemplateRoutingModule {}
