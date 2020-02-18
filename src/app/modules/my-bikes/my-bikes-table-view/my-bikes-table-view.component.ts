import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, throwError} from 'rxjs';
import {Bike} from '@models/bike/bike.types';
import {catchError, filter, map, tap} from 'rxjs/operators';
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

@Component({
  selector: 'lnr-my-bikes-table-view',
  templateUrl: './my-bikes-table-view.component.html',
  styleUrls: ['./my-bikes-table-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyBikesTableViewComponent implements OnInit, OnChanges {
  @Input() filter: string;

  displayedColumns = ['select', 'bike', 'brand', 'model', 'location', 'id', 'size', 'price', 'grouped', 'actions'];
  dataSource = new MatTableDataSource();
  expandedElement: any;
  selection = new SelectionModel<Bike>(true, []);
  dialogConfig = new DialogConfig('400px');

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isExpansionDetailRow = (i: number, row) => row.hasOwnProperty('detailRow');

  constructor(private apiRidesService: ApiRidesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchBikes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter) {
      this.dataSource.filter = changes.filter.currentValue;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

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

  checkboxLabel(row?: Bike): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  fetchBikes() {
    this.apiRidesService.getByUserId('17282').pipe(
      filter(resp => !!resp),
      tap(resp => console.log(resp)),
      map(resp => resp.bikes)
    )
      .subscribe(bikes => {
        console.log('1', bikes);
        this.dataSource.data = bikes;
      });
  }

  openDuplicateModal(id: string) {
    const dialogRef = this.dialog.open(MyBikesDuplicateModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });
  }

  openAvailabilityModal(id: string) {
    const dialogRef = this.dialog.open(MyBikesAvailabilityModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
    });
  }

  openDeleteModal(id: string) {
    const dialogRef = this.dialog.open(MyBikesDeleteModalComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data.approved) {
        this.apiRidesService.deleteBike(id).pipe(
          catchError(error => throwError(error.message || 'error occured'))
        )
          .subscribe(resp => {
            console.log('deleted', resp);
            this.fetchBikes();
          });
      }
    });
  }

  toggleAvailability(bikeId: string, availability: boolean) {
    const bikePayload = {
      ride: {
        id: bikeId,
        available: !availability
      }
    };

    this.apiRidesService.updateBike(bikeId, bikePayload).pipe(
      catchError(error => throwError(error.message || 'error occured'))
    )
      .subscribe(resp => {
        console.log('updated', resp);
        this.fetchBikes();
      });
  }

}

