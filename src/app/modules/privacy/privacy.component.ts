import { Component } from '@angular/core';
import { imagesAmazonFolder } from '@core/constants/external-path';

@Component({
  selector: 'lnr-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {
  MAIN_IMAGE_URL = `${imagesAmazonFolder}/privacy/main.jpg`;
}
