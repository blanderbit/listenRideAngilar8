export interface AdyenCardOutput {
  riskData: {
    clientData: string;
  };
  paymentMethod: {
    type: string;
    holderName?: string;
    encryptedCardNumber: string;
    encryptedExpiryMonth: string;
    encryptedExpiryYear: string;
    encryptedSecurityCode: string;
  };
  browserInfo: {
    acceptHeader: string;
    colorDepth: number;
    language: string;
    javaEnabled: boolean;
    screenHeight: number;
    screenWidth: number;
    userAgent: string;
    timeZoneOffset: number;
  };
}
