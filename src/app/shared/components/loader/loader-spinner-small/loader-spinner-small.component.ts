import { Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-loader-spinner-small',
  templateUrl: './loader-spinner-small.component.html',
  styleUrls: ['./loader-spinner-small.component.scss'],
})
export class LoaderSpinnerSmallComponent {
  @Input() color = null;
}
