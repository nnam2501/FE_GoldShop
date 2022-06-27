import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { customerURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getAllCustomer() {
    return this.httpClient.get(customerURL);
  }

  addNewCustomer(data: any) {
    return this.httpClient.post(customerURL, data);
  }

  putCustomer(id: any, data: any) {
    return this.httpClient.put(customerURL + `${id}/`, data);
  }

  delTmpCustomer(id: any) {
    return this.httpClient.post(customerURL + `${id}/delete_tmp/`, id);
  }
}
