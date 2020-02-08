import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '@environment/environment';
import {MaterialModule} from './material.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CoreModule} from '@core/core.module';
import {SharedModule} from './shared/shared.module';
import {ApiService} from '@core/services/api.service';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {MatMenuModule} from '@angular/material/menu';

import {MatIconRegistry} from '@angular/material';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpAuthInterceptor} from '@core/interceptors/http-auth-interceptor';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {LayoutModule} from '@core/modules/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';

export function provideAuthServiceConfig() {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(`${environment.LNR_API_KEY_FACEBOOK_PLATFORM}`)
    }
  ]);
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

export const APP_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthInterceptor,
    multi: true
  },
  {
    provide: AuthServiceConfig,
    useFactory: provideAuthServiceConfig
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    LayoutModule,
    MainModule,
    // TODO: Remove CoreModule from imports
    CoreModule,
    // TODO: Remove SharedModule from imports
    SharedModule,
    MaterialModule,
    SwiperModule,
    MatMenuModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    // NoopAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps,
      libraries: ['places', 'geometry']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
  ],
  providers: [
    ...APP_PROVIDERS,

    // TODO: remove ApiService from providers
    ApiService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    // TODO: filter mdi.svg to contains just needed icons
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
