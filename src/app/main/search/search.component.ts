import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import * as SearchActions from './store/search.actions';
import { SearchModel, Location } from "./search.types";
import {select, Store} from "@ngrx/store";
import {filter, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {getBikes, getDisplayBikes, getLocations} from "./store";
import {mapClusterStyle, mapColorScheme, mapDefaultOptions} from "../../core/constants/map-config";
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public displayBikes$: Observable<any>;
  public bikes = [];
  public pagingOffset =  0;
  public pagingLimit = 10;
  public pageAmount = 10;
  public pins;
  public mapToggle = false;
  public filterToggle = false;
  public isMobile = false;

  public location: Location = mapDefaultOptions;
  public mapStyles = mapColorScheme;
  public clusterStyles = mapClusterStyle;

  constructor(private SearchService: SearchService,
              private store: Store<SearchModel>,
              private deviceService: DeviceDetectorService ) {
  }

  ngOnInit() {
    this.store.dispatch(SearchActions.GetBikesPage({offset: this.pagingOffset, limit: this.pagingLimit}));
    this.store.dispatch(SearchActions.StartGetBikes({location: 'berlin'}));
    this.isMobile = this.deviceService.isMobile();

    this.store.pipe(
      select(getBikes),
      filter((bikes) => !!bikes)
      )
      .subscribe(bikes => {
        this.bikes = bikes.map(bike => { return {
          price: Math.ceil(bike.price_from).toString(),
          ...bike} });
      });

    this.displayBikes$ = this.store.pipe(
      select(getDisplayBikes),
      filter((bikes) => !!bikes)
    );

    this.store.pipe(
      select(getLocations),
      filter((locations) => !!locations.geometry)
    )
      .subscribe(locations => {
        console.log(locations);
        this.location = {city: locations.formatted_address, ...locations.geometry.location}
      });
  }

  onAutocompleteSelected(selection) {
    this.store.dispatch(SearchActions.StartGetBikes({location: selection.formatted_address}));
  }

  onScrollDown(ev) {
    console.log("scrolled");
    this.pagingOffset += this.pageAmount;
    this.pagingLimit += this.pageAmount;
    this.store.dispatch(SearchActions.GetBikesPage({offset: this.pagingOffset, limit: this.pagingLimit}));
  }

  toggleMap() {
    console.log('toggled map');
    this.mapToggle = !this.mapToggle;
  }

  toggleFilters() {
    console.log('toggled filter');
    this.filterToggle = !this.filterToggle;
  }
}
