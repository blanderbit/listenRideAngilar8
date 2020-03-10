import {NgModule} from '@angular/core';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {TimelineBlockComponent} from './timeline-block/timeline-block.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    EventsComponent,
    TimelineBlockComponent
  ],
  imports: [
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule {
}
