import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lnr-button-close',
  templateUrl: './button-close.component.html',
  styleUrls: ['./button-close.component.scss']
})
export class ButtonCloseComponent {
  @Input() disabled = false;
  @Input() color = '#ccc';
  @Output() closed = new EventEmitter<boolean>();

  onClose() {
    this.closed.emit(true);
  }
}
