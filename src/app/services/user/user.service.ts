import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userURL } from '../url';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getOauth2Info() {
    return this.httpClient.get('http://localhost:8000/oauth2-info/');
  }

  getCurrentUser(token: any) {
    return this.httpClient.get(userURL + 'current-user/', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  addNewUser(data: any) {
    return this.httpClient.post(userURL, data);
  }

  login(user: any) {
    return this.httpClient.post('http://localhost:8000/o/token/', user);
  }
}
