import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CamelCaseResponseKeys } from '@shared/decorators/camelcase-response-keys';
import { Reports } from './types';

const responseType = 'arraybuffer';

@Injectable({
  providedIn: 'root',
})
export class ApiInvoicesService {
  constructor(private httpClient: HttpClient) {}

  @CamelCaseResponseKeys()
  getReports(userId: number): Observable<Reports> {
    return this.httpClient.get<Reports>(`/users/${userId}/reports`);
  }

  getReportsPdf(userId: number, invoiceId: string, target: string): any {
    return this.httpClient.get(
      `/users/${userId}/invoices/${invoiceId}?target=${target}`,
      { responseType },
    );
  }

  getSettlementCsv(userId: number, batchId: string): any {
    return this.httpClient.get(`/users/${userId}/batches/${batchId}`, {
      responseType,
    });
  }

  getTransactionsCsv(userId: number, target: string): any {
    return this.httpClient.get(
      `/users/${userId}/transactions?target=${target}`,
      { responseType },
    );
  }
}
