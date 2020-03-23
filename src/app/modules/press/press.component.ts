import { Component } from '@angular/core';
import { imagesAmazonFolder } from '@core/constants/external-path';

@Component({
  selector: 'lnr-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss'],
})
export class PressComponent {
  MAIN_IMAGE_URL = `${imagesAmazonFolder}/press/press-main-img.jpg`;
}
