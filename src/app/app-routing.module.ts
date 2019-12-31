import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // <TODO> change to normal routing after homepage's created
  {
    path: '',
    redirectTo: 'main/search',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
