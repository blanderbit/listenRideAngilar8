import {Component, Input} from '@angular/core';

@Component({
  selector: 'lnr-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent {
  @Input() text: string = null;
}
