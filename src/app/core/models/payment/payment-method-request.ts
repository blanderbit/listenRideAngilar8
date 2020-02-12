import {PaymentMethodEnum} from '@models/payment/payment-method.enum';

export interface PaymentMethodRequest {
  payment_type: PaymentMethodEnum;
  // TODO: ask BE for type
  type: string; // "scheme"
  encryptedSecurityCode: string;
  encryptedExpiryMonth: string;
  encryptedExpiryYear: string;
  encryptedCardNumber: string;
  holderName: string;
}
