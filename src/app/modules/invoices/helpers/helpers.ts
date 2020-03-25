import * as fileSaver from 'file-saver';
import sumBy from 'lodash-es/sumBy';
import { Settlement } from '@models/invoices/invoices';

export const keyDescOrder = (a: any, b: any): number => {
  return a.key > b.key ? -1 : 1;
};

export const downLoadFile = (data: any, fileName: string, type: string) => {
  let blob = new Blob([data], { type });
  fileSaver.saveAs(blob, fileName);
};

export const getTotal = (invoices: Array<Settlement>): number => {
  return sumBy(invoices, invoice => invoice.amount);
};
