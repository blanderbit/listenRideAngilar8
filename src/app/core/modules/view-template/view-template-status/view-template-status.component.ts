import { Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-view-template-status',
  templateUrl: './view-template-status.component.html',
  styleUrls: ['./view-template-status.component.scss'],
})
export class ViewTemplateStatusComponent {
  @Input() value: string;
}
