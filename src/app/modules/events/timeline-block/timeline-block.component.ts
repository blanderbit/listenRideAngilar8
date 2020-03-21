import { Component, Input } from '@angular/core';
import { SeoEvent } from '@api/api-events/types';

@Component({
  selector: 'lnr-timeline-block',
  templateUrl: './timeline-block.component.html',
  styleUrls: ['./timeline-block.component.scss'],
})
export class TimelineBlockComponent {
  @Input() seoEvent: SeoEvent;
}
