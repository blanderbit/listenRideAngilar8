import { Component, Input } from '@angular/core';
import { LinkRelsEnum } from '../link-rels.enum';
import { LinkConfig } from '../link.config';

@Component({
  selector: 'lnr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements LinkConfig {
  @Input() href: string = null;

  @Input() rel = LinkRelsEnum.NOOPENER_NOREFERRER;
}
