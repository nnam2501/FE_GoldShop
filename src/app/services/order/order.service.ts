import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getAllOrder() {
    return this.httpClient.get(orderURL);
  }

  addOrder(newData: any) {
    return this.httpClient.post(orderURL, newData);
  }
}
