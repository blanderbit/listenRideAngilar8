import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventTemplateRoutingModule} from './event-template-routing.module';
import {EventTemplateComponent} from './event-template.component';
import {EventWelcomeScreenComponent} from './shared/event-welcome-screen/event-welcome-screen.component';


@NgModule({
  declarations: [EventTemplateComponent, EventWelcomeScreenComponent],
  imports: [
    CommonModule,
    EventTemplateRoutingModule
  ]
})
export class EventTemplateModule {
}
