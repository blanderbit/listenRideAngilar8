import {Component, Input} from '@angular/core';

@Component({
  selector: 'lnr-social-media-img',
  templateUrl: './social-media-img.component.html',
  styleUrls: ['./social-media-img.component.scss']
})
export class SocialMediaImgComponent {
  @Input() img: string;
  @Input() link: string;
}
