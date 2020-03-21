import { Component } from '@angular/core';
import { imagesAmazonFolder } from '@core/constants/external-path';

@Component({
  selector: 'lnr-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss'],
})
export class NeedHelpComponent {
  // eslint-disable-next-line global-require
  NEED_HELP_IMAGE = `${imagesAmazonFolder}/shared/lnr_support_jean@2x.jpg`;
}
