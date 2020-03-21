import { NgModule } from '@angular/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ListMyBikeComponent } from './list-my-bike.component';
import { ListMyBikeRoutingModule } from './list-my-bike-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserResolver } from './service/resolver';
import { UserEditDataResolver } from './service/resolverEdit';
import { ListStepCategoryComponent } from './components/list-step-category/list-step-category.component';
import { ListStepDetailsComponent } from './components/list-step-details/list-step-details.component';
import { ListStepPicturesComponent } from './components/list-step-pictures/list-step-pictures.component';
import { ListStepLocationsComponent } from './components/list-step-locations/list-step-locations.component';

@NgModule({
  declarations: [
    ListMyBikeComponent,
    ListStepCategoryComponent,
    ListStepDetailsComponent,
    ListStepPicturesComponent,
    ListStepLocationsComponent,
  ],
  imports: [
    ListMyBikeRoutingModule,
    MatGoogleMapsAutocompleteModule,
    SharedModule,
  ],
  entryComponents: [ListMyBikeComponent],
  providers: [UserResolver, UserEditDataResolver],
})
export class ListMyBikeModule {}
