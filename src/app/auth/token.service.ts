import { Injectable } from '@angular/core';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token: string, refreshToken: string) {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
}
