import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MyBikesComponent } from './my-bikes.component';
import { MyBikesRoutingModule } from './my-bikes-routing.module';
import { MyBikesTableViewComponent } from './my-bikes-table-view/my-bikes-table-view.component';
import { MyBikesGridViewComponent } from './my-bikes-grid-view/my-bikes-grid-view.component';
import { SharedModule } from '../../shared/shared.module';
import { MyBikesMergeModalComponent } from './shared/modals/my-bikes-merge-modal/my-bikes-merge-modal.component';
import { MyBikesAvailabilityModalComponent } from './shared/modals/my-bikes-availability-modal/my-bikes-availability-modal.component';
import { MyBikesDeleteModalComponent } from './shared/modals/my-bikes-delete-modal/my-bikes-delete-modal.component';
import { MyBikesActivateModalComponent } from './shared/modals/my-bikes-activate-modal/my-bikes-activate-modal.component';
import { MyBikesDuplicateModalComponent } from './shared/modals/my-bikes-duplicate-modal/my-bikes-duplicate-modal.component';
import { MyBikesReducer } from './store/my-bikes.reducers';
import { MyBikesEffects } from './store/my-bikes.effects';

@NgModule({
  declarations: [
    MyBikesComponent,
    MyBikesTableViewComponent,
    MyBikesGridViewComponent,
    MyBikesMergeModalComponent,
    MyBikesAvailabilityModalComponent,
    MyBikesDeleteModalComponent,
    MyBikesActivateModalComponent,
    MyBikesDuplicateModalComponent,
  ],
  imports: [
    CommonModule,
    MyBikesRoutingModule,
    SharedModule,
    StoreModule.forFeature('myBikes', MyBikesReducer),
    EffectsModule.forFeature([MyBikesEffects]),
  ],
  entryComponents: [
    MyBikesMergeModalComponent,
    MyBikesDeleteModalComponent,
    MyBikesActivateModalComponent,
    MyBikesDuplicateModalComponent,
    MyBikesAvailabilityModalComponent,
  ],
})
export class MyBikesModule {}
