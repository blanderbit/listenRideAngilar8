import { Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-image-on-bg-text',
  templateUrl: './image-on-bg-text.component.html',
  styleUrls: ['./image-on-bg-text.component.scss'],
})
export class ImageOnBgTextComponent {
  @Input() imageUrl: string;

  @Input() imageText: string;
}
