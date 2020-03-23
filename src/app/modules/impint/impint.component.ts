import { Component } from '@angular/core';
import { imagesAmazonFolder } from '@core/constants/external-path';

@Component({
  selector: 'lnr-impint',
  templateUrl: './impint.component.html',
  styleUrls: ['./impint.component.scss'],
})
export class ImpintComponent {
  MAIN_IMAGE_URL = `${imagesAmazonFolder}/imprint/lnr_imprint.jpg`;
}
