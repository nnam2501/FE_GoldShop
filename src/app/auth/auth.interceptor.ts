import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = '';

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const request = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${AuthInterceptor.accessToken}`,
    //   },
    // });

    // return next.handle(req);
    const token = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'content-type': 'application/json',
        },
      });
    }

    req = req.clone({
      headers: req.headers.set('Accept', 'application/json'),
    });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.error === 'invalid_token') {
            this.authService
              .refreshToken({ refresh_token: refreshToken })
              .subscribe(() => {
                location.reload();
              });
          } else {
            this.router
              .navigate(['/dashboard'])
              .then((_) => console.log('navigation is successful'));
          }
        }
        return throwError(error);
      })
    );
  }
}
