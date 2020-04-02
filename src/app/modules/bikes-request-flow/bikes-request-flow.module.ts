import { NgModule } from '@angular/core';
import { BikesRequestFlowComponent } from './bikes-request-flow.component';
import { BikesRequestFlowRoutingModule } from './bikes-request-flow-routing.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { DurationStepComponent } from './components/duration-step/duration-step.component';
import { PersonalDetailStepComponent } from './components/personal-detail-step/personal-detail-step.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserResolver } from './service/user-resolver';
import { BikeResolver } from './service/bike-resolver';
import { MatIconModule } from '@angular/material/icon';
import { UserVerificationModule } from '@user-verification/user-verification.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@auth/auth.module';
import { SettingsAccountModule } from '../settings/settings-account';
import { ThreeDSecureComponent } from './components/threeDSecure/threeDSecure.component';
import { BikeModule } from '../bike';

@NgModule({
  declarations: [
    BikesRequestFlowComponent,
    DurationStepComponent,
    PersonalDetailStepComponent,
    ThreeDSecureComponent,
  ],
  imports: [
    BikesRequestFlowRoutingModule,
    MatGoogleMapsAutocompleteModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    UserVerificationModule,
    SharedModule,
    AuthModule,
    SettingsAccountModule,
    BikeModule,
  ],
  entryComponents: [BikesRequestFlowComponent],
  providers: [UserResolver, BikeResolver],
})
export class BikesRequestFlowModule {}
