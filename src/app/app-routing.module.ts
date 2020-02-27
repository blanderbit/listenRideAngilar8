import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/home').then(m => m.HomeModule)},
  {path: 'list-bike', loadChildren: () => import('./modules/list-my-bike').then(m => m.ListMyBikeModule)},
  {path: 'privacy', loadChildren: () => import('./modules/privacy').then(m => m.PrivacyModule)},
  {path: 'search', loadChildren: () => import('./modules/search').then(m => m.SearchModule)},
  {path: 'settings', loadChildren: () => import('./modules/settings').then(m => m.SettingsModule)},
  {path: 'terms', loadChildren: () => import('./modules/terms').then(m => m.TermsModule)},
  {path: 'my-bikes', loadChildren: () => import('./modules/my-bikes').then(m => m.MyBikesModule)},
  {path: 'brands', loadChildren: () => import('./modules/brands').then(m => m.BrandsModule)},
  {path: '**', loadChildren: () => import('./modules/no-content').then(m => m.NoContentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
