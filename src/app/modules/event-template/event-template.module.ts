import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventTemplateRoutingModule} from './event-template-routing.module';
import {EventTemplateComponent} from './event-template.component';
import {EventWelcomeScreenComponent} from './shared/event-welcome-screen/event-welcome-screen.component';
import {EventsSwiperComponent} from './shared/events-swiper/events-swiper.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [EventTemplateComponent, EventWelcomeScreenComponent, EventsSwiperComponent],
  imports: [
    CommonModule,
    EventTemplateRoutingModule,
    SharedModule
  ]
})
export class EventTemplateModule {
}
