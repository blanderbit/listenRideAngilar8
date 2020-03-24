import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment/environment';
import { ApiOauthService } from '@api/api-oauth/api-oauth.service';
import { ElementFinder } from 'protractor';
import { AuthActions } from '@auth/store/actions';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';

@Component({
  selector: 'lnr-payment-method-pay-pal',
  templateUrl: './payment-method-pay-pal.component.html',
  styleUrls: ['./payment-method-pay-pal.component.scss'],
})
export class PaymentMethodPayPalComponent implements OnInit {
  @Input('user') user;
  @Output('onAuthorize') onAuthorize = new EventEmitter();
  @Output('onCancel') onCancel = new EventEmitter();
  @Output('onError') onError = new EventEmitter();
  @Input() isPaymentRequestFlow;

  braintree = (window as any).braintree;
  payPal = (window as any).paypal;
  spinner: boolean = true;

  constructor(
    private apiOauthService: ApiOauthService,
    private store: Store<fromAuth.State>,
  ) {}

  ngOnInit() {
    this.setupBraintreeClient().then(this.setBraintreeAndPaypal.bind(this));
  }

  setBraintreeAndPaypal(client: object) {
    this.braintree.paypalCheckout
      .create({ client })
      .then(this.createPayPalButton.bind(this))
      .then(() => {
        this.spinner = false;
      });
  }

  createPayPalButton(payPalCheckoutInstance: ElementFinder) {
    const payPal = this.payPal.Button.render(
      {
        env: environment.LNR_API_BRAINTREE_ENV,
        payment: () => payPalCheckoutInstance.createPayment({ flow: 'vault' }),
        onAuthorize: (data: object) => {
          return payPalCheckoutInstance
            .tokenizePayment(data)
            .then((test: object) =>
              this.apiOauthService.savePaypalPaymentMethod(test, this.user.id),
            )
            .then((res: object) => {
              this.store.dispatch(AuthActions.updateUserByApi());
              this.onAuthorize.emit(res);
              payPal.close();
            })
            .catch(err => this.onError.emit(err));
        },
        onCancel: (data: object) => {
          this.onCancel.emit(data);
        },
        onError: (err: object) => {
          this.onError.emit(err);
        },
        locale: 'en_US',
        style: {
          shape: 'rect',
          color: 'blue',
          size: 'medium',
          label: 'paypal',
          tagline: 'false',
        },
      },
      '#paypaldata',
    );
    return payPal;
  }

  setupBraintreeClient = (): Promise<object> =>
    this.fetchClientToken().then(this.createBrainTreeClient.bind(this));

  createBrainTreeClient = (authorization: string): Promise<object> =>
    this.braintree.client.create({ authorization });

  fetchClientToken = (): Promise<object> =>
    this.apiOauthService.fetchClientToken(this.user.id);
}
