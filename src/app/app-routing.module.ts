import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home').then(m => m.HomeModule),
  },
  {
    path: 'list-bike',
    loadChildren: () =>
      import('./modules/list-my-bike').then(m => m.ListMyBikeModule),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./modules/bikes-request-flow').then(
        m => m.BikesRequestFlowModule,
      ),
  },
  {
    path: 'privacy',
    loadChildren: () => import('./modules/privacy').then(m => m.PrivacyModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search').then(m => m.SearchModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users/:id',
    loadChildren: () => import('./modules/users').then(m => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'terms',
    loadChildren: () => import('./modules/terms').then(m => m.TermsModule),
  },
  {
    path: 'my-bikes',
    loadChildren: () => import('./modules/my-bikes').then(m => m.MyBikesModule),
  },
  {
    path: 'brands',
    loadChildren: () =>
      import('./modules/brand-template/brand-template.module').then(
        m => m.BrandTemplateModule,
      ),
  },
  {
    path: 'bikes',
    loadChildren: () => import('./modules/bikes').then(m => m.BikesModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./modules/no-content').then(m => m.NoContentModule),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./modules/event-template/event-template.module').then(
        m => m.EventTemplateModule,
      ),
  },
  { path: 'about',
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'press',
    loadChildren: () =>
      import('./modules/press/press.module').then(m => m.PressModule) },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
