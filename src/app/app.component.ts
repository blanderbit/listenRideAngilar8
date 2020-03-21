import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { getImagesFromFolder } from './shared/helpers/mat-icons-helper';
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

  ngOnInit() {
    const IMAGES_FOLDER_PATH = '../../../assets/images';

    // TODO: maybe it's better to move this longer list to the helper file
    let importIconsList = [
      ...getImagesFromFolder('categories'),
      ...getImagesFromFolder('accessories'),
      {
        name: 'filter',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/filter_icon.svg`
      },
      {
        name: 'reset-filter',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/reset_filter_icon.svg`
      },
      {
        name: 'sort',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/sort_icon.svg`
      },
      {
        name: 'copy',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/copy_icon.svg`
      },
      {
        name: 'merge',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/merge_icon.svg`
      },
      {
        name: 'unmerge',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/unmerge_icon.svg`
      },
      {
        name: 'visibility',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/visibility_icon.svg`
      },
      {
        name: 'visibility-off',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/visibility_off_icon.svg`
      },
    ];

    // set categories to material icons
    importIconsList.forEach(({name, path}) => {
      this.matIconRegistry.addSvgIcon(
        `lnr-${name}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(path)
      );
    });

  }
}
