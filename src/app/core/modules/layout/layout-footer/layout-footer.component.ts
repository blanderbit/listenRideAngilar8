import {Component} from '@angular/core';
import {LayoutFooterListLinksConfig} from '@core/modules/layout/layout-footer/layout-footer-list-links.config';

@Component({
  selector: 'lnr-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent {
  links = LayoutFooterListLinksConfig;
  currentYear: number = new Date().getFullYear();
}
