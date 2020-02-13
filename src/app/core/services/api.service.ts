import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl: string;
  private readonly authUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/`;
    this.authUrl = environment.apiUrl;

  }

  public login(body, url?: string): Observable<any> {
    return this.http.post(`${!!url ? url : ''}/login`, body);
  }

  public logout(): Observable<any> {
    return this.http.post(`/logout`, {});
  }

  /**
   * Generic Function to GET list of Items
   */
  public getList(path: string, options?): Observable<any> {
    return this.http.get<any[]>(`${path.includes('http') ? path : '/' + path}`, options);
  }

  /**
   * Generic Function to CREATE One Item by ID
   */
  public createSingle(path: string, data: any, options?): Observable<any> {
    return this.http.post<any>(`${path.includes('http') ? path : '/' + path}`, data, options);
  }

  /**
   * Generic Function to GET One Item by ID
   */
  public getSingle(path: string, id: string, options?): Observable<any> {
    return this.http.get<any>(`${path.includes('http') ? path : '/' + path}/${id}`, options);
  }

  /**
   * Generic Function to UPDATE One Item by ID
   */
  public updateSingle(path: string, id: string, data: any, options?): Observable<any> {
    return this.http.put<any>(`${path.includes('http') ? path : '/' + path}/${id}`, data, options);
  }

  // tslint:disable-next-line:variable-name
  public create(path: string, data: any, options?, _apiUrl?: string): Observable<any> {
    return this.http.post<any>(`${_apiUrl || '/'}${path}`, data, options);
  }

  public get<T>(url: string, options?): Observable<any> {
    if (options && options.params) {
      options.params = new HttpParams({fromObject: options.params, encoder: new CustomEncoder()} as any);
    }
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, body: any, options?: any): Observable<any> {
    return this.http.post<T>(url, body, options);
  }

  public put<T>(url: string, body: any, options?): Observable<any> {
    return this.http.put<T>(url, body, options);
  }

  public patch<T>(url: string, body: any): Observable<any> {
    return this.http.patch<T>(url, body);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }

}
