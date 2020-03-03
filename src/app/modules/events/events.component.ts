import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SeoEventResponse} from '@models/seo/seo-requests';
import {ApiSeoService} from '@api/api-seo/api-seo.service';

@Component({
  selector: 'lnr-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<Array<SeoEventResponse>>;

  constructor(private apiSeoService: ApiSeoService) {
  }

  ngOnInit() {
    this.events$ = this.apiSeoService.getEvents();
  }
}
