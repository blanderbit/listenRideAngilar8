import { Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss'],
})
export class ImageTextComponent {
  @Input() imageUrl: string;

  @Input() imageAlign: string = 'left' || 'right' || 'top' || 'bottom';
}
