import {Component, OnInit} from '@angular/core';
import {User} from '@models/user/user';

type TabType = 'account' | 'availability' | 'profile';

@Component({
  selector: 'lnr-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  tabType: TabType = 'profile';
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('USER'));
  }

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
