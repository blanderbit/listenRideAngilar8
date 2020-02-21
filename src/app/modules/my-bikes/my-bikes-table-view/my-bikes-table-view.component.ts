import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {of, Subject, throwError} from 'rxjs';
import {Bike} from '@models/bike/bike.types';
import {
  catchError,
  delay, expand,
  filter,
  takeUntil,
  tap
} from 'rxjs/operators';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {MyBikesDuplicateModalComponent} from '../shared/modals/my-bikes-duplicate-modal/my-bikes-duplicate-modal.component';
import {MyBikesDeleteModalComponent} from '../shared/modals/my-bikes-delete-modal/my-bikes-delete-modal.component';
import {SelectionModel} from '@angular/cdk/collections';
import {MyBikesAvailabilityModalComponent} from '../shared/modals/my-bikes-availability-modal/my-bikes-availability-modal.component';
import {select, Store} from '@ngrx/store';
import {MyBikesState} from '../my-bikes.types';
import {User} from '@models/user/user';
import {
  DeleteBike,
  GetMyBikes,
  SetMyBikesLoading,
  UnmergeBikes,
  UpdateBike,
  WatchBikeJob
} from '../store/my-bikes.actions';
import {getBikes} from '../store';
import {MyBikesMergeModalComponent} from '../shared/modals/my-bikes-merge-modal/my-bikes-merge-modal.component';

@Component({
  selector: 'lnr-my-bikes-table-view',
  templateUrl: './my-bikes-table-view.component.html',
  styleUrls: ['./my-bikes-table-view.component.scss'],
})
export class MyBikesTableViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filter: string;
  @Output() selectedBikes = new EventEmitter();

  displayedColumns = ['select', 'bike', 'brand', 'model', 'location', 'id', 'size', 'price', 'grouped', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Bike>(true, []);
  dialogConfig = new DialogConfig('400px');
  user: User;
  destroy$ = new Subject();

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiRidesService: ApiRidesService, private dialog: MatDialog, private store: Store<MyBikesState>) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(GetMyBikes());

    this.store.pipe(
      select(getBikes),
      takeUntil(this.destroy$),
      filter(resp => !!resp.length)
    )
      .subscribe(bikes => this.dataSource.data = bikes);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter) {
      this.dataSource.filter = changes.filter.currentValue;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  routeToEdit = (id: number | string): Promise<boolean> => this.router.navigate([`/list-bike/${id}`])

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: Bike) => this.selection.select(row));
  }

  rowToggle(row) {
    this.selection.toggle(row);
    this.selectedBikes.emit(this.selection.selected);
  }

  checkboxLabel(row?: Bike): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  // <TODO> Refactor this and removed from component
  openDuplicateModal(id: number) {
    const dialogRef = this.dialog.open(MyBikesDuplicateModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.apiRidesService.duplicateBike(id, {
        duplicate: {
          quantity: data
        }
      })
        .subscribe(resp => {
          this.watchJob(id, resp.job_id);
          // this.store.dispatch(WatchBikeJob({bikeId: id, jobId: resp.job_id}));
        });
    });
  }

  // <TODO> this also
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

  openAvailabilityModal(id: string) {
    const dialogRef = this.dialog.open(MyBikesAvailabilityModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });
  }

  openDeleteModal(bikeId: number) {
    const dialogRef = this.dialog.open(MyBikesDeleteModalComponent, this.dialogConfig);

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

  openUnMergeModal(clusterId: number) {
    const dialogRef = this.dialog.open(MyBikesMergeModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data.approved) {
        this.store.dispatch(UnmergeBikes({clusterId}));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}

