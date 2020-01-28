import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@models/user/user';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {environment} from '@environment/environment';
import {PhoneUpdateRequest} from '@models/user/phone-update-request';
import {PhoneConfirmRequest} from '@models/user/phone-confirm-request';

@Injectable({providedIn: 'root'})
export class ApiUserService {

  constructor(private httpClient: HttpClient) {
  }

  me(): Observable<Partial<User>> {
    return this.httpClient.get<Partial<User>>(`${environment.apiUrl}/users/me`);
  }

  create(signUpRequest: SignUpRequest): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, signUpRequest);
  }

  read(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/${userId}`);
  }

  update(userId: number, user: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/users/${userId}`, user);
  }

  updateLogo(userId: any, file: Blob, fileName: string): Observable<User> {
    const uploadData = new FormData();
    uploadData.append('user[profile_picture]', file, fileName);

    return this.httpClient.put<User>(`${environment.apiUrl}/users/${userId}`, uploadData);
  }

  emailRequestConfirm(): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/send_confirmation_email`, null);
  }

  phoneUpdate(userId: number, phoneUpdateRequest: PhoneUpdateRequest): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/users/${userId}/update_phone`, phoneUpdateRequest);
  }

  phoneConfirm(phoneConfirmRequest: PhoneConfirmRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/confirm_phone`, phoneConfirmRequest);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/reset_password`, {email});
  }

}
