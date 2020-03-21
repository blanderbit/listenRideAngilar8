import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AddressComponent } from '@shared/components/address/address.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorMessageModule } from '@shared/components/http-error-message/http-error-message.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    HttpErrorMessageModule,
  ],
  exports: [AddressComponent],
})
export class AddressModule {}
