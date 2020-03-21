import { Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-bike-description-block',
  templateUrl: './bike-description-block.component.html',
  styleUrls: ['./bike-description-block.component.scss'],
})
export class BikeDescriptionBlockComponent {
  @Input() bikeDescription: string;
}
