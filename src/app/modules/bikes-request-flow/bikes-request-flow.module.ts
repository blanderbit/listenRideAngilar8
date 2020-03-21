import { NgModule } from '@angular/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UserVerificationModule } from '@user-verification/user-verification.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@auth/auth.module';
import { BikeResolver } from './service/bike-resolver';
import { UserResolver } from './service/user-resolver';
import { PersonalDetailStepComponent } from './components/personal-detail-step/personal-detail-step.component';
import { PaymentStepComponent } from './components/payment-step/payment-step.component';
import { HelpComponent } from './components/help/help.component';
import { DurationStepComponent } from './components/duration-step/duration-step.component';
import { BikesRequestFlowRoutingModule } from './bikes-request-flow-routing.module';
import { BikesRequestFlowComponent } from './bikes-request-flow.component';

@NgModule({
  declarations: [
    BikesRequestFlowComponent,
    DurationStepComponent,
    HelpComponent,
    PaymentStepComponent,
    PersonalDetailStepComponent,
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
  ],
  entryComponents: [BikesRequestFlowComponent],
  providers: [UserResolver, BikeResolver],
})
export class BikesRequestFlowModule {}
