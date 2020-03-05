import {Component, Input, OnInit} from '@angular/core';
import {SeoEvent} from '@api/api-events/types';

@Component({
  selector: 'lnr-timeline-block',
  templateUrl: './timeline-block.component.html',
  styleUrls: ['./timeline-block.component.scss']
})
export class TimelineBlockComponent implements OnInit {
  @Input() seoEvent: SeoEvent;

  constructor() {
  }

  ngOnInit() {
  }

}
