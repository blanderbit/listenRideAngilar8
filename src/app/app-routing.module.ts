import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  // <TODO> change to normal routing after homepage's created
  {
    path: 'terms',
    loadChildren: () => import('./modules/terms').then(m => m.TermsModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./modules/privacy').then(m => m.PrivacyModule)
  },
  {
    path: 'list-bike',
    loadChildren: () => import('./modules/listMyBike').then(m => m.ListMyBikeModule)
  },
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
export class AppRoutingModule {
}
