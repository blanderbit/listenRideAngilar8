import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {Bike} from '@models/bike/bike.types';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'lnr-my-bikes',
  templateUrl: './my-bikes.component.html',
  styleUrls: ['./my-bikes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyBikesComponent implements OnInit {
  bikes$: Observable<Bike[]>;
  filterValue: string;
  gridView = false;
  viewLabel = 'Grid View';
  constructor(private apiRidesService: ApiRidesService) { }

  ngOnInit() {
    this.bikes$ = this.apiRidesService.getByUserId('11442').pipe(
      filter(resp => !!resp),
      tap(resp => console.log(resp)),
      map(resp => resp.bikes)
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

}
