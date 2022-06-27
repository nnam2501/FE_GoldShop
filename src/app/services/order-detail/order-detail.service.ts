import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { orderDetailURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  constructor(private httpClient: HttpClient) {}

  getAllOrderDetail() {
    return this.httpClient.get(orderDetailURL);
  }

  getOrderDetailById(id: number) {
    return this.httpClient.get(orderDetailURL + id);
  }

  addOrderDetail(orderDetail: any) {
    return this.httpClient.post(orderDetailURL, orderDetail);
  }
}
