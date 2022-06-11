import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { supplierURL } from '../url';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  header: any = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  };
  constructor(private httpClient: HttpClient) {}

  getSupp = () => {
    return this.httpClient.get(supplierURL, this.header);
  };

  postSupp = (newData: any) => {
    return this.httpClient.post(supplierURL, newData, this.header);
  };

  delTmpSupp = (id: any) => {
    return this.httpClient.post(
      supplierURL + `${id}/delete_tmp/`,
      id,
      this.header
    );
  };

  putSupp = (id: any, data: any) => {
    return this.httpClient.put(supplierURL + `${id}/`, data, this.header);
  };
}
