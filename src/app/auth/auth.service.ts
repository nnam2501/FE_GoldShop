import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

const OAUTH2_CLIENT = 'client_id';
const OAUTH2_SECRET = 'client_secret';
const API_URL = 'http://localhost:8000/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // Authorization: 'Basic ' + btoa(OAUTH2_CLIENT + OAUTH2_SECRET),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  redirectUrl: string = '';

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private static log(message: string) {
    console.log(message);
  }
  client: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/oauth2-info/').subscribe((data) => {
      this.client = data;
      console.log(this.client);
    });
  }

  login(loginData: any, client: any): Observable<any> {
    this.tokenService.removeToken();

    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('client_id', client.client_id)
      .set('client_secret', client.client_secret)
      .set('grant_type', client.grant_type);

    const data = new FormGroup({
      username: new FormControl(loginData.username),
      password: new FormControl(loginData.password),
      client_id: new FormControl(client.client_id),
      client_secret: new FormControl(client.client_secret),
      grant_type: new FormControl(client.grant_type),
    });
    console.log(body);

    return this.http
      .post(API_URL + 'o/token/', body, HTTP_OPTIONS)
      .pipe(map((token) => token));
    // .pipe(
    //   tap((res) => {
    //     this.tokenService.saveToken(res.access_token, res.refresh_token);
    //   }),
    //   catchError(AuthService.handleError)
    // );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');

    return this.http.post<any>(API_URL + 'o/token/', body, HTTP_OPTIONS).pipe(
      tap((res) => {
        this.tokenService.saveToken(res.access_token, res.refresh_token);
      }),
      catchError(AuthService.handleError)
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(API_URL + 'users/', data).pipe(
      tap((_) => AuthService.log('register')),
      catchError(AuthService.handleError)
    );
  }
}
