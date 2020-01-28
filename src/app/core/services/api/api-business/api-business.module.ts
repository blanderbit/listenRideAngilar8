import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {apiBusinessReducer} from '@api/api-business/store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {ApiBusinessEffects} from '@api/api-business/store/effects/api-business.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('apiBusiness', apiBusinessReducer),
    EffectsModule.forFeature([ApiBusinessEffects])
  ]
})
export class ApiBusinessModule {

}
