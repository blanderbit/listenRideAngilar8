import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: 'search',
        loadChildren: './search/search.module#SearchModule',
      },
      {
        path: 'home',
        component: HomePageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
