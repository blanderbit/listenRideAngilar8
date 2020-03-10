import {NgModule} from '@angular/core';
import {SettingsAccountComponent} from './settings-account.component';
import {SettingsCompanyInfoComponent} from '../shared/settings-company-info/settings-company-info.component';
import {SettingsDeactivateAccountComponent} from '../shared/settings-deactivate-account/settings-deactivate-account.component';
import {SettingsNewsletterComponent} from '../shared/settings-newsletter/settings-newsletter.component';
import {SettingsNotificationsComponent} from '../shared/settings-notifications/settings-notifications.component';
import {SettingsPaymentMethodComponent} from '../shared/settings-payment-method/settings-payment-method.component';
import {SettingsPayoutMethodComponent} from '../shared/settings-payout-method/settings-payout-method.component';
import {SettingsVouchersComponent} from '../shared/settings-vouchers/settings-vouchers.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    SettingsAccountComponent,
    SettingsCompanyInfoComponent,
    SettingsDeactivateAccountComponent,
    SettingsNewsletterComponent,
    SettingsNotificationsComponent,
    SettingsPaymentMethodComponent,
    SettingsPayoutMethodComponent,
    SettingsVouchersComponent,
  ],
  imports: [SharedModule],
  exports: [SettingsAccountComponent]
})
export class SettingsAccountModule {

}
