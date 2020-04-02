import { Component, Input } from '@angular/core';
import { Faq } from '@api/api-faqs';

@Component({
  selector: 'lnr-faq-panel',
  templateUrl: './faq-panel.component.html',
  styleUrls: ['./faq-panel.component.scss'],
})
export class FaqPanelComponent {
  @Input() faq: Faq;
}
