import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import * as SearchActions from './store/search.actions';
import { SearchModel, Location } from "./search.types";
import {select, Store} from "@ngrx/store";
import {filter, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {getBikes, getLocations} from "./store";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private rides$: Observable<any>;
  public location: Location;
  public pins;

  constructor(private SearchService: SearchService, private store: Store<SearchModel>) {
  }

  ngOnInit() {
    this.store.dispatch(SearchActions.StartGetBikes({location: 'berlin'}));

    this.store.pipe(
      select(getBikes),
      filter((bikes) => !!bikes)
      )
      .subscribe(bikes => {
        this.pins = bikes.map(bike => {
          return bike.location;
        });
        this.rides$ = of(bikes)
      });

    this.store.pipe(
      select(getLocations),
      filter((locations) => !!locations.geometry)
    )
      .subscribe(locations => this.location = locations.geometry.location);
  }
}
