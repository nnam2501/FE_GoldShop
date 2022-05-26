import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { supplierURL } from '../url';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private httpClient: HttpClient) {}

  getSupp = () => {
    return this.httpClient.get(supplierURL);
  };

  postSupp = (newData: any) => {
    return this.httpClient.post(supplierURL, newData);
  };

  delTmpSupp = (id: any) => {
    return this.httpClient.post(supplierURL + `${id}/delete_tmp/`, id);
  };

  putSupp = (id: any, data: any) => {
    return this.httpClient.put(supplierURL + `${id}/`, data);
  };
}
