import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EventTemplateComponent} from './event-template.component';

const routes: Routes = [{path: '', component: EventTemplateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTemplateRoutingModule {
}
