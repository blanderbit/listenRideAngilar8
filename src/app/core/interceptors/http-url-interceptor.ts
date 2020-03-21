import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable()
export class HttpUrlInterceptor implements HttpInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const API_URL = environment.LNR_API_ENDPOINT;
    const include =
      request.url.includes('http') ||
      request.url.includes('https') ||
      request.url.includes('assets');
    const url = include ? request.url : `${API_URL}${request.url}`;

    const newRequest = request.clone({
      url,
    });

    return next.handle(newRequest);
  }
}
