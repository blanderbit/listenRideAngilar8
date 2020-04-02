import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '@environment/environment';

import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconRegistry } from '@angular/material';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { HttpAuthInterceptor } from '@core/interceptors/http-auth-interceptor';
import { HttpUrlInterceptor } from '@core/interceptors/http-url-interceptor';
import {
  AuthServiceConfig,
  FacebookLoginProvider,
  SocialLoginModule,
} from 'angularx-social-login';
import { LayoutModule } from '@core/modules/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '@core/guards/auth.guard';
import { AuthModule } from '@auth/auth.module';
import { UserVerificationModule } from '@user-verification/user-verification.module';
import { metaReducers } from './reducers';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchReducer } from './modules/search/store/search.reducers';
import { SearchEffects } from './modules/search/store/search.effects';
import { BIKE_FEATURE } from './modules/bike/store';
import { BikeReducer } from './modules/bike/store/reducer';
import { BikeEffects } from './modules/bike/store/effects';

export function provideAuthServiceConfig(): AuthServiceConfig {
  return new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(
        `${environment.LNR_API_KEY_FACEBOOK_PLATFORM}`,
      ),
    },
  ]);
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/default/');
}

export const APP_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpUrlInterceptor,
    multi: true,
  },
  {
    provide: AuthServiceConfig,
    useFactory: provideAuthServiceConfig,
  },
  AuthGuard,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AuthModule,
    CommonModule,
    LayoutModule,
    StoreModule.forFeature('search', SearchReducer),
    EffectsModule.forFeature([SearchEffects]),
    StoreModule.forFeature(BIKE_FEATURE, BikeReducer),
    EffectsModule.forFeature([BikeEffects]),
    UserVerificationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      },
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.LNR_API_KEY_GOOGLE_MAPS,
      libraries: ['places', 'geometry'],
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
  ],
  providers: [...APP_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    // TODO: filter mdi.svg to contains just needed icons
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/images/icons/shared/mdi.svg',
      ),
    );
  }
}
