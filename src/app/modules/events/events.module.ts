import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { TimelineBlockComponent } from './timeline-block/timeline-block.component';

@NgModule({
  declarations: [EventsComponent, TimelineBlockComponent],
  imports: [EventsRoutingModule, SharedModule],
})
export class EventsModule {}
