import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bike} from '@models/bike/bike.types';
import {Observable} from 'rxjs';
import {BikesModalService} from '../services/bikes-modal.service';
import {MyBikesState} from '../my-bikes.types';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ApiRidesService} from "@api/api-rides/api-rides.service";

@Component({
  selector: 'lnr-my-bikes-grid-view',
  templateUrl: './my-bikes-grid-view.component.html',
  styleUrls: ['./my-bikes-grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyBikesGridViewComponent implements OnInit {

  @Input() bikes$: Observable<Bike[]>;
  @Output() selectedBikes = new EventEmitter();
  selection: Array<string> = [];
  showSelectionOverlay = false;

  openDeleteModal = this.bikesModalService.openDeleteModal;
  toggleAvailability = this.bikesModalService.toggleAvailability;
  openUnMergeModal = this.bikesModalService.openUnMergeModal;
  openAvailabilityModal = this.bikesModalService.openAvailabilityModal;
  openDuplicateModal = this.bikesModalService.openDuplicateModal;
  watchJob = this.bikesModalService.watchJob;

  constructor(private bikesModalService: BikesModalService,
              private apiRidesService: ApiRidesService,
              private store: Store<MyBikesState>,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.bikes$.subscribe(b => {
      this.selection = [];
      this.showSelectionOverlay = false;
    });
  }

  routeToEdit = (id: number | string): Promise<boolean> => this.router.navigate([`/list-bike/${id}`]);

  toggleBike(bikeId: string) {
    const index = this.selection.indexOf(bikeId);
    index === -1 ? this.selection.push(bikeId) : this.selection.splice(index, 1);
    this.selectedBikes.emit(this.selection);

    this.showSelectionOverlay = this.selection.length > 0;
  }

}
