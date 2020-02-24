import {Injectable} from '@angular/core';
import {MyBikesDeleteModalComponent} from '../shared/modals/my-bikes-delete-modal/my-bikes-delete-modal.component';
import {
  DeleteBike,
  GetMyBikes,
  MergeBikes,
  SetMyBikesLoading,
  UnmergeBikes,
  UpdateBike
} from '../store/my-bikes.actions';
import {MatDialog} from '@angular/material/dialog';
import {MyBikesState} from '../my-bikes.types';
import {Store} from '@ngrx/store';
import {MyBikesMergeModalComponent} from '../shared/modals/my-bikes-merge-modal/my-bikes-merge-modal.component';
import {MyBikesAvailabilityModalComponent} from '../shared/modals/my-bikes-availability-modal/my-bikes-availability-modal.component';
import {MyBikesDuplicateModalComponent} from '../shared/modals/my-bikes-duplicate-modal/my-bikes-duplicate-modal.component';
import {of, Subject} from 'rxjs';
import {delay, expand, takeUntil, tap, filter} from 'rxjs/operators';
import {ApiRidesService} from '@api/api-rides/api-rides.service';

@Injectable({
  providedIn: 'root'
})
export class BikesModalService {

  constructor(private dialog: MatDialog, private store: Store<MyBikesState>, private apiRidesService: ApiRidesService) {
  }

  openDuplicateModal(id: number | string) {
    const dialogRef = this.dialog.open(MyBikesDuplicateModalComponent, {width: '400px'});

    dialogRef.afterClosed().subscribe(quantity => {
      this.apiRidesService.duplicateBike(id, {
        duplicate: {quantity}
      })
        .subscribe(resp => {
          this.watchJob(id, resp.job_id);
        });
    });
  }

  openMergeModal(bikeIds) {
    const dialogRef = this.dialog.open(MyBikesMergeModalComponent, {width: '400px'});

    dialogRef.afterClosed().subscribe(data => {
      if (data.approved) {
        this.store.dispatch(MergeBikes({bikeIds}));
      }
    });
  }

  openUnMergeModal(clusterId: number) {
    const dialogRef = this.dialog.open(MyBikesMergeModalComponent, {width: '400px'});

    dialogRef.afterClosed().subscribe(data => {
      if (data.approved) {
        this.store.dispatch(UnmergeBikes({clusterId}));
      }
    });
  }

  openAvailabilityModal(id: string, timeSlots: {[key: string]: any}) {
    const dialogRef = this.dialog.open(MyBikesAvailabilityModalComponent, {data: {id, timeSlots}});

    dialogRef.afterClosed().subscribe(data => {
      // TODO: the logic will be added later
    });
  }

  openDeleteModal(bikeId: number) {
    const dialogRef = this.dialog.open(MyBikesDeleteModalComponent, {width: '400px'});

    dialogRef.afterClosed().subscribe(data => {
      if (data.approved) {
        this.store.dispatch(DeleteBike({bikeId}));
      }
    });
  }

  toggleAvailability(bikeId: number, availability: boolean) {
    const bikePayload = {
      ride: {
        id: bikeId,
        available: !availability
      }
    };

    this.store.dispatch(UpdateBike({bikeId, bike: bikePayload}));
  }

  watchJob(bikeId, jobId) {
    const destroyed$ = new Subject();
    const getBikeStatus = this.apiRidesService.getBikeJobStatus(bikeId, jobId).pipe(delay(3000), takeUntil(destroyed$));

    getBikeStatus
      .pipe(
        tap(res => this.store.dispatch(SetMyBikesLoading({loading: true}))),
        expand( res => res.status !== 'completed' ? getBikeStatus : of(res)),
        filter(res => res.status === 'complete'),
      )
      .subscribe(data => {
        this.store.dispatch(GetMyBikes());
        destroyed$.next();
        destroyed$.complete();
      });
  }
}
