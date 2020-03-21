import { Component, Input } from '@angular/core';
import { LinkConfig } from '../link.config';

@Component({
  selector: 'lnr-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent {
  @Input() title: string;

  @Input() links?: LinkConfig[];
}
