import {Component} from '@angular/core';

type TabType = 'account' | 'availability' | 'profile';

@Component({
  selector: 'lnr-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  tabType: TabType = 'profile';

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
