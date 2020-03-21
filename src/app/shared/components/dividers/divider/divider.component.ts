import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  @Input() text: string = null;

  @Input() required = false;
}
