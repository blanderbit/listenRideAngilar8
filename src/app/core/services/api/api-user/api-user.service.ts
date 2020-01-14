import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@models/user/user';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {environment} from '@environment/environment';

@Injectable({providedIn: 'root'})
export class ApiUserService {

  constructor(private httpClient: HttpClient) {
  }

  create(signUpRequest: SignUpRequest): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, signUpRequest);
  }

}
