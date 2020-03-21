import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-image-on-bg-text',
  templateUrl: './image-on-bg-text.component.html',
  styleUrls: ['./image-on-bg-text.component.scss']
})
export class ImageOnBgTextComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() imageText: string;

  constructor() {
  }

  ngOnInit() {
  }

}
