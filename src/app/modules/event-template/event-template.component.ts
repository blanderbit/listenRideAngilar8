import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiEventsService } from '@api/api-events';
import { EventInfo } from '@api/api-events/types';

@Component({
  selector: 'lnr-event-template',
  templateUrl: './event-template.component.html',
  styleUrls: ['./event-template.component.scss'],
})
export class EventTemplateComponent implements OnInit {
  public event: EventInfo;

  constructor(
    private route: ActivatedRoute,
    private apiEventsService: ApiEventsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ name }) => {
      this.apiEventsService.getEvent(name).subscribe(
        data => {
          this.event = data;
        },
        error => {
          this.router.navigate(['404']);
        },
      );
    });
  }
}
