import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { keyDescOrder, getTotal } from '../helpers/helpers';
import { DownloadFileService } from '../services/download-file.service';
import { Settlement } from '@models/invoices/invoices';

@Component({
  selector: 'lnr-invoices-settlement-history',
  templateUrl: './invoices-settlement-history.component.html',
  styleUrls: ['./invoices-settlement-history.component.scss'],
})
export class InvoicesSettlementHistoryComponent implements OnInit {
  @Input() reports: { [key: string]: Array<Settlement> };
  @Input() userId: number;
  @Input() isMobile: boolean;

  keyDescOrder = keyDescOrder;
  getTotal = getTotal;

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

  getSettlementCsv(batchId: string) {
    this.downloadFileService.getSettlementCsv(this.userId, batchId);
  }
}
