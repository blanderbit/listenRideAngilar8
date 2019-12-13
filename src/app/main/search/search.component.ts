import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import * as SearchActions from './store/search.actions';
import { SearchModel, Location } from "./search.types";
import {select, Store} from "@ngrx/store";
import {filter, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {getBikes, getDisplayBikes, getLocations} from "./store";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public displayBikes$: Observable<any>;
  public pagingOffset =  0;
  public pagingLimit = 10;
  public pageAmount = 10;
  public pins;

  public location: Location = {
    lat: 0,
    lng: 0,
    type: 'satellite',
    zoom: 5
  };

  constructor(private SearchService: SearchService, private store: Store<SearchModel>) {
  }

  ngOnInit() {
    this.store.dispatch(SearchActions.GetBikesPage({offset: this.pagingOffset, limit: this.pagingLimit}));
    this.store.dispatch(SearchActions.StartGetBikes({location: 'berlin'}));

    this.store.pipe(
      select(getBikes),
      filter((bikes) => !!bikes)
      )
      .subscribe(bikes => {
        this.pins = bikes.map(bike => bike.location);
      });

    this.store.pipe(
      select(getDisplayBikes),
      filter((bikes) => !!bikes)
    )
      .subscribe(bikes => {console.log(bikes); this.displayBikes$ = of(bikes)});


    this.store.pipe(
      select(getLocations),
      filter((locations) => !!locations.geometry)
    )
      .subscribe(locations => this.location = {...locations.geometry.location});
  }

  onAutocompleteSelected(selection) {
    this.store.dispatch(SearchActions.StartGetBikes({location: selection.formatted_address}));
  }

  onScrollDown(ev) {
    this.pagingOffset += this.pageAmount;
    this.pagingLimit += this.pageAmount;
    this.store.dispatch(SearchActions.GetBikesPage({offset: this.pagingOffset, limit: this.pagingLimit}));
  }
}
