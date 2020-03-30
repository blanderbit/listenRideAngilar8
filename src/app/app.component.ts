import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthActions, UserApiActions } from '@auth/store/actions';
import { Subject, throwError } from 'rxjs';
import { ApiUserService } from '@api/api-user/api-user.service';
import { User } from '@models/user/user';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getImagesFromFolder } from './shared/helpers/mat-icons-helper';
import * as fromAuth from './core/modules/auth/store/reducers';

@Component({
  selector: 'lnr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'listnride-frontend-new';

  loading = true;

  private destroyed$ = new Subject();

  constructor(
    private store: Store<fromAuth.State>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public translate: TranslateService,
    private apiUserService: ApiUserService,
  ) {
    // this language will be used as a fallback when
    // a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    this.checkUser();
    const IMAGES_FOLDER_PATH = '../../../assets/images';

    // TODO: maybe it's better to move this longer list to the helper file
    const importIconsList = [
      ...getImagesFromFolder('categories'),
      ...getImagesFromFolder('accessories'),
      {
        name: 'filter',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/filter_icon.svg`,
      },
      {
        name: 'reset-filter',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/reset_filter_icon.svg`,
      },
      {
        name: 'sort',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/sort_icon.svg`,
      },
      {
        name: 'copy',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/copy_icon.svg`,
      },
      {
        name: 'merge',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/merge_icon.svg`,
      },
      {
        name: 'unmerge',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/unmerge_icon.svg`,
      },
      {
        name: 'visibility',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/visibility_icon.svg`,
      },
      {
        name: 'visibility-off',
        path: `${IMAGES_FOLDER_PATH}/icons/shared/visibility_off_icon.svg`,
      },
    ];

    // set categories to material icons
    importIconsList.forEach(({ name, path }) => {
      this.matIconRegistry.addSvgIcon(
        `lnr-${name}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(path),
      );
    });
  }
  
  checkUser() {
    this.store
      .select(fromAuth.isLoggedIn)
      .pipe(
        switchMap((status: boolean) => {
          return status ? this.apiUserService.me() : throwError('Not login');
        }),
        switchMap((me: Partial<User>) => {
          return this.apiUserService.read(me.id);
        }),
      )
      .subscribe(
        user => {
          if (user) {
            this.store.dispatch(AuthActions.updateUser({ user }));
            this.store.dispatch(UserApiActions.getUserByIdSuccess({ user }));
          }
          this.loading = false;
          this.destroyed();
        },
        () => {
          this.store.dispatch(AuthActions.logout({ withoutReload: true }));
          this.store.dispatch(AuthActions.closeLoginDialog());
          this.loading = false;
        },
        () => {
          this.loading = false;
        },
      );
  }

  ngOnDestroy(): void {
    this.destroyed();
  }

  destroyed(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
