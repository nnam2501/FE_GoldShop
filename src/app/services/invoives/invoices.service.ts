import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { invoiceURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private httpClient: HttpClient) {}

  getAllInvoice() {
    return this.httpClient.get(invoiceURL);
  }

  addNewInvoice(invoice: any) {
    return this.httpClient.post(invoiceURL, invoice);
  }
}
