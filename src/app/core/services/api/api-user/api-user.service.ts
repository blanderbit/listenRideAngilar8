import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@models/user/user';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {PhoneUpdateRequest} from '@models/user/phone-update-request';
import {PhoneConfirmRequest} from '@models/user/phone-confirm-request';
import {CamelCaseResponseKeys} from '@shared/decorators/camelcase-response-keys';
import {SignUpFacebookRequest} from '@models/sign-up/sign-up-facebook-request';
import {PaymentMethodUpdateRequest} from '@models/payment/payment-method-update-request';

@Injectable({providedIn: 'root'})
export class ApiUserService {
  constructor(private httpClient: HttpClient) {}

  @CamelCaseResponseKeys()
  me(): Observable<Partial<User>> {
    return this.httpClient.get<Partial<User>>(`/users/me`);
  }

  @CamelCaseResponseKeys()
  create(signUpRequest: SignUpRequest | SignUpFacebookRequest): Observable<User> {
    return this.httpClient.post<User>(`/users`, signUpRequest);
  }

  @CamelCaseResponseKeys()
  read(userId: number): Observable<User> {
    return this.httpClient.get<User>(`/users/${userId}`);
  }

  @CamelCaseResponseKeys()
  update(userId: number, user: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`/users/${userId}`, user);
  }

  updatePaymentMethods(userId: number, paymentMethodUpdateRequest: PaymentMethodUpdateRequest): Observable<User> {
    return this.httpClient.put<User>(`/users/${userId}/payment_methods`, paymentMethodUpdateRequest);
  }

  @CamelCaseResponseKeys()
  updateLogo(userId: any, file: Blob, fileName: string): Observable<User> {
    const uploadData = new FormData();
    uploadData.append('user[profile_picture]', file, fileName);

    return this.httpClient.put<User>(`/users/${userId}`, uploadData);
  }

  emailRequestConfirm(): Observable<any> {
    return this.httpClient.post<any>(`/send_confirmation_email`, null);
  }

  phoneUpdate(userId: number, phoneUpdateRequest: PhoneUpdateRequest): Observable<any> {
    return this.httpClient.put<any>(
      `/users/${userId}/update_phone`,
      phoneUpdateRequest
    );
  }

  phoneConfirm(phoneConfirmRequest: PhoneConfirmRequest): Observable<any> {
    return this.httpClient.post<any>(`/confirm_phone`, phoneConfirmRequest);
  }

  resetPassword(email: string): Observable<any> {
    return this.httpClient.post(`/users/reset_password`, {email});
  }
}
