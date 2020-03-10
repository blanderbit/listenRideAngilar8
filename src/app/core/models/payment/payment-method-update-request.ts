import {PaymentTypeEnum} from '@models/payment/payment-type.enum';
import {PaymentDataTypeEnum} from '@models/payment/payment-data-type.enum';

export interface PaymentMethodUpdateRequest {
  payment_method: {
    payment_type: PaymentTypeEnum;
    data: {
      type: PaymentDataTypeEnum;
      encryptedCardNumber: string;
      encryptedExpiryMonth: string;
      encryptedExpiryYear: string;
      encryptedSecurityCode: string;
      holderName: string
    }
  };
}
