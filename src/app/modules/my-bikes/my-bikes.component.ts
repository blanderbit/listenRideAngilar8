import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {Bike} from '@models/bike/bike.types';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {getBikes, getLoadingState} from './store';
import {MyBikesState} from './my-bikes.types';
import {GetMyBikes, MergeBikes} from './store/my-bikes.actions';
import {MyBikesMergeModalComponent} from './shared/modals/my-bikes-merge-modal/my-bikes-merge-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@core/configs/dialog/dialog.config';

@Component({
  selector: 'lnr-my-bikes',
  templateUrl: './my-bikes.component.html',
  styleUrls: ['./my-bikes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyBikesComponent implements OnInit, OnDestroy {
  bikes$: Observable<Bike[]>;
  selectedBikes: number[];
  filterValue: string;
  loading$: Observable<boolean>;
  gridView = false;
  viewLabel = 'Grid View';
  dialogConfig = new DialogConfig('400px');
  destroyed$ = new Subject();

  constructor(private apiRidesService: ApiRidesService,
              private dialog: MatDialog,
              private store: Store<MyBikesState>) { }

  ngOnInit() {
    this.store.dispatch(GetMyBikes());

    this.bikes$ = this.store.pipe(
      select(getBikes),
      takeUntil(this.destroyed$),
      filter(resp => !!resp)
    );

    this.loading$ = this.store.pipe(
      select(getLoadingState),
      takeUntil(this.destroyed$),
      tap(res => console.log(res))
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
  }

  toggleView() {
    this.gridView = !this.gridView;
    this.viewLabel =  this.gridView ? 'Table View' : 'Grid View';
  }

  updateSelection(bikes) {
    this.selectedBikes = bikes.map(bike => bike.id);
  }

  mergeBikes() {
    const dialogRef = this.dialog.open(MyBikesMergeModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data.approved) {
        this.store.dispatch(MergeBikes({bikeIds: this.selectedBikes}));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

}
