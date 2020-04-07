import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { keyDescOrder } from '../helpers/helpers';
import { DownloadFileService } from '../services/download-file.service';
import { Invoice } from '@models/invoices/invoices';
import isEmpty from 'lodash-es/isEmpty';

@Component({
  selector: 'lnr-invoices-as-rider',
  templateUrl: './invoices-as-rider.component.html',
  styleUrls: ['./invoices-as-rider.component.scss'],
})
export class InvoicesAsRiderComponent implements OnInit {
  @Input() reports: { [key: string]: Array<Invoice> };
  @Input() userId: number;

  keyDescOrder = keyDescOrder;
  isEmpty = isEmpty;

  constructor(
    private downloadFileService: DownloadFileService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.downloadFileService.errorHappend.subscribe((value: boolean) => {
      if (value)
        this.openSnackBar(this.translate.instant('toasts.request-failed'));
    });
  }

  openSnackBar = (message: string, success = false): any => {
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [success ? 'green-snackbar' : 'red-snackbar'],
    });
  };

  getPdf(invoiceId: string) {
    this.downloadFileService.getPdf(this.userId, invoiceId, 'rider');
  }

  getCsv() {
    this.downloadFileService.getCsv(this.userId, 'rider');
  }
}
