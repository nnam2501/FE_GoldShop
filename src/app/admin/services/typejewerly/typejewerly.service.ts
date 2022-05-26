import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { typejewerlyURL } from '../url';

@Injectable({
  providedIn: 'root',
})
export class TypejewerlyService {
  constructor(private httpClient: HttpClient) {}

  getType = () => {
    return this.httpClient.get(typejewerlyURL);
  };

  postType = (newData: any) => {
    return this.httpClient.post(typejewerlyURL, newData);
  };

  delTmpType = (id: any) => {
    return this.httpClient.post(typejewerlyURL + `${id}/delete_tmp/`, id);
  };

  putType = (id: any, data: any) => {
    return this.httpClient.put(typejewerlyURL + `${id}/`, data);
  };
}
