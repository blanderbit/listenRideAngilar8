import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiInvoicesService } from '@api/api-invoices';
import { Invoice } from '@models/invoices/invoices';
import { keyDescOrder } from '../helpers/helpers';
import { DownloadFileService } from '../services/download-file.service';
import isEmpty from 'lodash-es/isEmpty';

@Component({
  selector: 'lnr-invoices-as-lister',
  templateUrl: './invoices-as-lister.component.html',
  styleUrls: ['./invoices-as-lister.component.scss'],
})
export class InvoicesAsListerComponent implements OnInit {
  @Input() reports: { [key: string]: Array<Invoice> };
  @Input() userId: number;
  @Input() isMobile: boolean;

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
    this.downloadFileService.getPdf(this.userId, invoiceId, 'lister');
  }

  getCsv() {
    this.downloadFileService.getCsv(this.userId, 'lister');
  }
}
