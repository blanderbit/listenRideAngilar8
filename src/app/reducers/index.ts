import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '@environment/environment';
import {localStorageSync} from 'ngrx-store-localstorage';
import {authFeatureKey} from '@auth/store/reducers';


// tslint:disable-next-line:no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {
  // SearchReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [authFeatureKey],
    rehydrate: true,
    restoreDates: false
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
