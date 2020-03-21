// TODO Fix all the esLint errors and warnings
/* eslint-disable */
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

  ngOnInit(): void {
    this.setErrorMessage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('error') && !changes.error.firstChange) {
      this.setErrorMessage();
    }
  }

  private setErrorMessage() {
    if (this.error) {
      if (
        this.error.hasOwnProperty('error') &&
        this.error.error &&
        this.error.error.hasOwnProperty('errors')
      ) {
        const err0 = this.error.error.errors[0];
        this.message = `${err0.source.pointer} ${err0.detail}`;
      } else {
        this.message = 'Something wrong';
      }
    } else {
      this.message = null;
    }
  }
}
