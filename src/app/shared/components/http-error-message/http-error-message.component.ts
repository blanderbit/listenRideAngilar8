// TODO Fix all the esLint errors and warnings
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'lnr-http-error-message',
  templateUrl: './http-error-message.component.html',
  styleUrls: ['./http-error-message.component.scss'],
})
export class HttpErrorMessageComponent implements OnInit, OnChanges {
  @Input() error: HttpErrorResponse;

  message: string;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.setErrorMessage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line no-prototype-builtins
    if (changes.hasOwnProperty('error') && !changes.error.firstChange) {
      this.setErrorMessage();
    }
  }

  private setErrorMessage() {
    if (this.error) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        this.error.hasOwnProperty('error') &&
        this.error.error &&
        // eslint-disable-next-line no-prototype-builtins
        this.error.error.hasOwnProperty('errors')
      ) {
        const err0 = this.error.error.errors[0];
        this.message = `${err0.source.pointer} ${err0.detail}`;
      } else {
        this.message = this.translate.instant('toast.request-failed)');
      }
    } else {
      this.message = null;
    }
  }
}
