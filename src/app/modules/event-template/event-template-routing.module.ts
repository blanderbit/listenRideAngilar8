import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventTemplateComponent } from './event-template.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../events/events.module').then(m => m.EventsModule),
  },
  { path: ':name', component: EventTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventTemplateRoutingModule {}
