import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiInvoicesService } from '@api/api-invoices';
import { downLoadFile } from '../helpers/helpers';
import * as moment from 'moment';

const todayDate: string = moment().format('MMMM Do YYYY');

@Injectable({
  providedIn: 'root',
})
export class DownloadFileService {
  public errorHappend = new BehaviorSubject(false);

  constructor(private apiInvoicesService: ApiInvoicesService) {}

  getPdf(userId: number, invoiceId: string, target: string) {
    const title: string = target === 'lister' ? 'Credit note' : 'Invoice';
    const fileName: string = `${title} ${invoiceId} ${todayDate}.pdf`;
    this.apiInvoicesService.getReportsPdf(userId, invoiceId, target).subscribe(
      data => {
        downLoadFile(data, fileName, 'application/pdf');
      },
      e => {
        this.errorHappend.next(true);
      },
    );
  }

  getCsv(userId: number, target: string) {
    const fileName: string = `Billings as ${target} ${todayDate}.csv`;
    this.apiInvoicesService.getTransactionsCsv(userId, target).subscribe(
      data => {
        downLoadFile(data, fileName, 'application/csv');
      },
      e => {
        this.errorHappend.next(true);
      },
    );
  }

  getSettlementCsv(userId: number, batchId: string) {
    const fileName: string = `settlement_detail_report_batch_${batchId}.csv`;
    this.apiInvoicesService.getSettlementCsv(userId, batchId).subscribe(
      data => {
        downLoadFile(data, fileName, 'application/csv');
      },
      e => {
        this.errorHappend.next(true);
      },
    );
  }
}
