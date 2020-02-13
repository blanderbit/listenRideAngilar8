import {Component, OnInit, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map, takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as fromAuth from './core/modules/auth/store/reducers';
import {Subject} from 'rxjs';
import {UserApiActions} from '@auth/store/actions';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'lnr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'listnride-frontend-new';
  private destroyed$ = new Subject();

  constructor(
    private store: Store<fromAuth.State>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    this.store.pipe(
      select(fromAuth.selectAuthGetUserCombine),
      takeUntil(this.destroyed$),
      map(([me, user]) => [
          (me || this.lS_Select('ME')),
          (user || this.lS_Select('USER'))
        ]
      )
    )
      .subscribe(([me, user]) => {
          if (me && user) {
            this.store.dispatch(UserApiActions.UserDataInitialize({me, user}));
            this.destroyed();
          }
        },
        (e) => console.log(e));

    this.matIconRegistry.addSvgIcon(
      'lnr-filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ui_icons/filter_icon.svg')
    )
      .addSvgIcon(
        'lnr-reset-filter',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ui_icons/reset_filter_icon.svg')
      )
      .addSvgIcon(
        'lnr-sort',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/sort_icon.svg')
      )
      .addSvgIcon(
      'lnr-bike-cat-1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_1.svg')
      )
      .addSvgIcon(
      'lnr-bike-cat-2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_2.svg')
      )
      .addSvgIcon(
      'lnr-bike-cat-3',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_3.svg')
      )
      .addSvgIcon(
        'lnr-bike-cat-4',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_4.svg')
      )
      .addSvgIcon(
        'lnr-bike-cat-5',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_5.svg')
      )
      .addSvgIcon(
        'lnr-bike-cat-6',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_6.svg')
      )
      .addSvgIcon(
        'lnr-bike-cat-7',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/bikes/biketype_7.svg')
      );
  }

  private lS_Select(type) {
    try {
      return JSON.parse(localStorage.getItem(type));
    } catch (e) {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.destroyed();
  }

  destroyed(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
