import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-social-media-img',
  templateUrl: './social-media-img.component.html',
  styleUrls: ['./social-media-img.component.scss']
})
export class SocialMediaImgComponent implements OnInit {
  @Input() img: string;
  @Input() link: string;

  constructor() {
  }

  ngOnInit() {
  }

}
