import { Component } from '@angular/core';
import { imagesAmazonFolder } from '@core/constants/external-path';

@Component({
  selector: 'lnr-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  MAIN_IMAGE_URL = imagesAmazonFolder;
}
