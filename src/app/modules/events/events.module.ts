import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {TimelineBlockComponent} from './timeline-block/timeline-block.component';
import {MaterialModule} from '../../material.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    EventsComponent,
    TimelineBlockComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule {
}
