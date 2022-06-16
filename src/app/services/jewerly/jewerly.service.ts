import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jewerlyURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class JewerlyService {
  constructor(private httpClient: HttpClient) {}

  getJewerly = () => {
    return this.httpClient.get(jewerlyURL);
  };

  getJewerlyById = (id: any) => {
    return this.httpClient.get(jewerlyURL + `${id}/`);
  };

  postJewerly = (newData: any) => {
    return this.httpClient.post(jewerlyURL, newData);
  };

  delTmpJewerly = (id: any) => {
    return this.httpClient.post(jewerlyURL + `${id}/delete_tmp/`, id);
  };

  putJewerly = (id: any, data: any) => {
    return this.httpClient.put(jewerlyURL + `${id}/`, data);
  };
}
