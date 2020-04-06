import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';

type TabType = 'account' | 'availability' | 'profile';

@Component({
  selector: 'lnr-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  tabType: TabType = 'account';

  user$ = this.storeAuth.pipe(select(fromAuth.selectUser));

  constructor(private storeAuth: Store<fromAuth.State>) {}

  get showAccount() {
    return this.tabType === 'account';
  }

  get showAvailability() {
    return this.tabType === 'availability';
  }

  get showProfile() {
    return this.tabType === 'profile';
  }

  toggleTab(tabType: TabType) {
    this.tabType = tabType;
  }
}
