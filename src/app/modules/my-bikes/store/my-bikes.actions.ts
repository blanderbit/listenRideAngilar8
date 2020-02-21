import {createAction, props} from '@ngrx/store';
import {Bike} from '@models/bike/bike.types';

export const GetMyBikes = createAction('[My Bikes] - Get Bikes');
export const SuccessGetMyBikes = createAction('[My Bikes] - Get bikes success', props<{ payload: Bike[] }>());
export const SetMyBikesLoading = createAction('[My Bikes] - Set Loader', props<{ loading: boolean }>());
export const UpdateBike = createAction('[My Bikes] - Update Bike', props<{ bikeId: number, bike: any }>());
export const DuplicateBike = createAction('[My Bikes] - Duplicate Bike', props<{ bikeId: number, quantity: number }>());
export const WatchBikeJob = createAction('[My Bikes] - Watch Bike Job', props<{ bikeId: number, jobId: number }>());
export const BikeJobSuccess = createAction('[My Bikes] - Bike Job Success');
export const MergeBikes = createAction('[My Bikes] - Merge Bikes', props<{ bikeIds: number[] }>());
export const UnmergeBikes = createAction('[My Bikes] - Unmerge Bikes', props<{ clusterId: number }>());
export const DeleteBike = createAction('[My Bikes] - Delete Bike', props<{ bikeId: number }>());
export const BikesError = createAction('[My Bikes] - Server Error', props<Error>());


