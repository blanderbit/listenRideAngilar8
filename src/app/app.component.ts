import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import * as fromAuth from './core/modules/auth/store/reducers';

@Component({
  selector: 'lnr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'listnride-frontend-new';

  constructor(
    private store: Store<fromAuth.State>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public translate: TranslateService,
  ) {
    // this language will be used as a fallback when
    // a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    this.matIconRegistry
      .addSvgIcon(
        'lnr-filter',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../assets/ui_icons/filter_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-reset-filter',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../assets/ui_icons/reset_filter_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-sort',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/sort_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-1',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_1.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-2',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_2.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-3',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_3.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-4',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_4.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-5',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_5.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-6',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_6.svg',
        ),
      )
      .addSvgIcon(
        'lnr-bike-cat-7',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/bikes/biketype_7.svg',
        ),
      )
      .addSvgIcon(
        'lnr-copy',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/lnr_copy_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-merge',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/lnr_merge_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-unmerge',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/lnr_unmerge_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-visibility',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/lnr_visibility_icon.svg',
        ),
      )
      .addSvgIcon(
        'lnr-visibility-off',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/ui_icons/lnr_visibility_off_icon.svg',
        ),
      );
  }
}
