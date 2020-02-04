import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import * as SearchActions from './store/search.actions';
import {SearchModel, Location, SearchPayload} from './search.types';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {Bike} from '@core/models/bike/bike.types';
import {getBikes, getBikesPins, getFilterPayload, getFilterToggle, getLocations, getSortingToggle} from './store';
import {mapClusterStyle, mapColorScheme, mapDefaultOptions} from '@core/constants/map-config';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'lnr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public bikes: Bike[];
  public page =  1;
  public pageAmount = 10;
  public pins;
  public mapToggle = false;
  public showFilter = false;
  public showSorting = true;
  public isTablet = false;
  public isMobile = false;
  public isDesktop = false;
  public scrolled = false;
  public openedWindow: string;
  public activeBike = {} as Bike;
  public filterPayload: SearchPayload;

  public location: Location = mapDefaultOptions;
  public mapStyles = mapColorScheme;
  public clusterStyles = mapClusterStyle;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private SearchService: SearchService,
              private store: Store<SearchModel>,
              private deviceService: DeviceDetectorService ) {
  }

  ngOnInit() {
    this.store.dispatch(SearchActions.SetSearchPayload({ page: this.page, limit: this.pageAmount }));
    this.isTablet = this.deviceService.isTablet();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();

    this.store.pipe(
      select(getBikes),
      filter((bikes) => !!bikes)
      )
      .subscribe(bikes => this.bikes = bikes);

    this.store.pipe(select(getBikesPins))
      .subscribe(pins => this.pins = pins);

    this.store.pipe(
      select(getLocations),
      filter((locations) => !!locations.geometry)
    )
      .subscribe(locations => this.location = {city: locations.formatted_address, ...locations.geometry.location});

    this.store.pipe(
        select(getFilterPayload),
        filter(filterPayload => !!filterPayload && !!filterPayload.location)
      )
      .subscribe(filterPayload =>  {
        this.filterPayload = {...filterPayload};
        this.store.dispatch(SearchActions.GetBikes());
      });

    this.store.pipe(select(getFilterToggle))
      .subscribe(showFilter => this.showFilter = showFilter);

    this.store.pipe(select(getSortingToggle))
      .subscribe(showSorting =>  this.showSorting = showSorting );
  }

  onScrollDown(ev) {
    console.log('scrolled', ev);
    this.scrolled = true;
    this.filterPayload.page++;
    this.store.dispatch(SearchActions.SetSearchPayload(this.filterPayload));
  }

  onScrollUp(ev) {
    console.log('scrolled up', ev);
    this.scrolled = false;
    console.log(this.scrolled);
  }

  toggleMap() {
    console.log('toggled map');
    this.mapToggle = !this.mapToggle;
  }

  toggleFilters() {
    console.log('toggled filter');
    this.store.dispatch(SearchActions.setSearchFilterToggle({showFilter: !this.showFilter}));
  }

  toggleSorting() {
    console.log('toggled sorting');
    this.store.dispatch(SearchActions.setSearchSortingToggle({showSorting: !this.showSorting}));
  }

  openWindow(id) {
    this.openedWindow = null;
    this.activeBike = {} as Bike;

    this.SearchService.getSingleBike(id).subscribe(bike => {
      this.activeBike = bike;
      this.openedWindow = id;
    });
  }

  isInfoWindowOpened(id) {
    return this.openedWindow === id;
  }
}
