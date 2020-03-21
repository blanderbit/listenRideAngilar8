import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Bike } from '@models/bike/bike.types';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { getBikes, getLoadingState } from './store';
import { MyBikesState } from './my-bikes.types';
import { GetMyBikes, GetMyFilteredBikes } from './store/my-bikes.actions';
import { BikesModalService } from './services/bikes-modal.service';

@Component({
  selector: 'lnr-my-bikes',
  templateUrl: './my-bikes.component.html',
  styleUrls: ['./my-bikes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBikesComponent implements OnInit, OnDestroy {
  bikes$: Observable<Bike[]>;

  selectedBikes: number[];

  filterValue: string;

  loading$: Observable<boolean>;

  gridView = false;

  viewLabel = 'Grid View';

  destroyed$ = new Subject();

  mergeBikes = this.bikesModalService.openMergeModal;

  constructor(
    private bikesModalService: BikesModalService,
    private dialog: MatDialog,
    private store: Store<MyBikesState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(GetMyBikes());

    this.bikes$ = this.store.pipe(
      select(getBikes),
      takeUntil(this.destroyed$),
      filter(resp => !!resp),
    );

    this.loading$ = this.store.pipe(
      select(getLoadingState),
      takeUntil(this.destroyed$),
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
    if (this.gridView) {
      if (this.filterValue.length) {
        this.store.dispatch(
          GetMyFilteredBikes({ params: { q: this.filterValue } }),
        );
      } else {
        this.store.dispatch(GetMyBikes());
      }
    }
  }

  toggleView() {
    this.gridView = !this.gridView;
    this.viewLabel = this.gridView ? 'Table View' : 'Grid View';
  }

  updateSelection(bikes) {
    this.selectedBikes = bikes;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
