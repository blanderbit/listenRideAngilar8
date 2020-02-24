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
import {Subject} from 'rxjs';
import {Bike} from '@models/bike/bike.types';
import {
  filter,
  takeUntil,
} from 'rxjs/operators';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {select, Store} from '@ngrx/store';
import {MyBikesState} from '../my-bikes.types';
import {GetMyBikes} from '../store/my-bikes.actions';
import {getBikes} from '../store';
import {Router} from '@angular/router';
import {BikesModalService} from '../services/bikes-modal.service';

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
  destroy$ = new Subject();

  openDeleteModal = this.bikesModalService.openDeleteModal;
  toggleAvailability = this.bikesModalService.toggleAvailability;
  openUnMergeModal = this.bikesModalService.openUnMergeModal;
  openAvailabilityModal = this.bikesModalService.openAvailabilityModal;
  openDuplicateModal = this.bikesModalService.openDuplicateModal;
  watchJob = this.bikesModalService.watchJob;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiRidesService: ApiRidesService,
              private bikesModalService: BikesModalService,
              private dialog: MatDialog,
              private store: Store<MyBikesState>,
              private router: Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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

  routeToEdit = (id: number | string): Promise<boolean> => this.router.navigate([`/list-bike/${id}`]);

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
    this.selectedBikes.emit(this.selection.selected.map(bike => bike.id));
  }

  checkboxLabel(row?: Bike): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}

