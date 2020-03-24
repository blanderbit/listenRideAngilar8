import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from '@models/user/user';
import { ApiOauthService } from '@api/api-oauth/api-oauth.service';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from '@auth/store/actions';

@Component({
  selector: 'lnr-payment-method-credit-card',
  templateUrl: './payment-method-credit-card.component.html',
  styleUrls: [
    '../../../../modules/settings/shared/settings-form.scss',
    './payment-method-credit-card.component.scss',
  ],
})
export class PaymentMethodCreditCardComponent {
  form: FormGroup;
  @Input('mode') mode: 'view' | 'update' = 'view';
  @Input('isPaymentRequestFlow') isPaymentRequestFlow: boolean;
  @Input('user') user;
  @Input() data = {
    result: {},
    active: false,
  };
  @Output('onAuthorize') onAuthorize = new EventEmitter();
  @Output('onError') onError = new EventEmitter();
  @Output('onClose') onClose = new EventEmitter();
  payment: any;

  constructor(
    private fb: FormBuilder,
    private apiOauthService: ApiOauthService,
    private cdRef: ChangeDetectorRef,
    private store: Store<fromAuth.State>,
  ) {}

  openView() {
    this.mode = 'view';
    this.onClose.emit('view');
  }

  openUpdate() {
    this.mode = 'update';
  }

  getValidData(event) {
    this.data.result = event;
    this.data.active = true;
    this.cdRef.detectChanges();
  }

  save() {
    this.apiOauthService
      .postCreditCard(this.data.result, this.user.id)
      .then(res => {
        if (!this.isPaymentRequestFlow) {
          this.mode = 'view';
        }
        this.store.dispatch(AuthActions.updateUserByApi());
        this.onAuthorize.emit(res);
      })
      .catch(res => this.onError.emit({ message: 'Invalid data' }));
  }
}
