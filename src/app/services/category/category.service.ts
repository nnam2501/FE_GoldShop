import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { caterogyURL } from '../url';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCate = () => {
    return this.httpClient.get(caterogyURL);
  };

  postCate = (newData: any) => {
    return this.httpClient.post(caterogyURL, newData);
  };

  delTmpCate = (id: any) => {
    return this.httpClient.post(caterogyURL + `${id}/delete_tmp/`, id);
  };

  putCate = (id: any, data: any) => {
    return this.httpClient.put(caterogyURL + `${id}/`, data);
  };
}
