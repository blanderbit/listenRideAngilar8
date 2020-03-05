import {Component, OnInit} from '@angular/core';
import * as SearchActions from './store/search.actions';
import {Location, SearchMetaData, SearchModel, SearchPayload} from './search.types';
import {select, Store} from '@ngrx/store';
import {distinctUntilChanged, filter, take} from 'rxjs/operators';
import {Bike} from '@core/models/bike/bike.types';
import {
  getBikes,
  getBikesPins,
  getFilterPayload,
  getFilterToggle,
  getLocations, getSearchLoading,
  getSearchMetadata,
  getSortingToggle
} from './store';
import {mapClusterStyle, mapColorScheme, mapDefaultOptions} from '@core/configs/map/map.config';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiRidesService} from '@api/api-rides/api-rides.service';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'lnr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  bikes: Bike[];
  pins;
  mapToggle = false;
  showFilter = false;
  showSorting = true;
  loading$: Observable<boolean>;
  isTablet = false;
  isMobile = false;
  isDesktop = false;
  scrolled = false;
  openedWindow: string;
  activeBike = {} as Bike;
  filterPayload: SearchPayload;
  metaData: SearchMetaData;

  location: Location = mapDefaultOptions;
  mapStyles = mapColorScheme;
  clusterStyles = mapClusterStyle;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private apiRidesService: ApiRidesService,
              private store: Store<SearchModel>,
              private deviceService: DeviceDetectorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.isTablet = this.deviceService.isTablet();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();

    this.route.queryParamMap
      .pipe(take(1))
      .subscribe((paramMap) => {
        const metaData: SearchMetaData = {
          location: paramMap.get('location') || null,
          page:     paramMap.get('page') ? parseInt(paramMap.get('page'), 10) : null,
          limit:    paramMap.get('limit') ? parseInt(paramMap.get('limit'), 10) : null,
        };
        const filterParams: SearchPayload = {
          category:   paramMap.get('category') || null,
          height:     paramMap.get('height') ? parseInt(paramMap.get('height'), 10) : null,
          brand:      paramMap.get('brand') || null,
          start_date: paramMap.get('start_date') ? new Date(paramMap.get('start_date')).toISOString() : null,
          duration:   paramMap.get('duration') ? parseInt(paramMap.get('duration'), 10) : null,
          sort_by:    paramMap.get('sort_by') || null,
          sort_direction: paramMap.get('sort_direction') || null,
        };

        this.store.dispatch(SearchActions.SetSearchMetaData({metaData}));
        this.store.dispatch(SearchActions.SetSearchPayload(filterParams));
      });

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

    combineLatest(
      this.store.select(getFilterPayload),
      this.store.select(getSearchMetadata),
    ).pipe(
      filter(([filterPayload, metaData]) => !!metaData && !!metaData.location),
      distinctUntilChanged()
    )
      .subscribe(([filterPayload, metaData]) => {
        this.metaData = {...metaData};
        this.store.dispatch(SearchActions.GetBikes());

        this.router.navigate([], {
          queryParams: {...metaData, ...filterPayload},
          replaceUrl: true
        });
      });

    this.store.pipe(select(getFilterToggle))
      .subscribe(showFilter => this.showFilter = showFilter);

    this.store.pipe(select(getSortingToggle))
      .subscribe(showSorting => this.showSorting = showSorting);

    this.loading$ = this.store.pipe(select(getSearchLoading));
  }

  onScrollDown(ev) {
    this.scrolled = true;
    this.metaData.page++;
    this.store.dispatch(SearchActions.SetSearchMetaData({metaData: this.metaData}));
  }

  onScrollUp(ev) {
    this.scrolled = false;
  }

  toggleMap() {
    this.mapToggle = !this.mapToggle;
  }

  toggleFilters() {
    this.store.dispatch(SearchActions.setSearchFilterToggle({showFilter: !this.showFilter}));
  }

  toggleSorting() {
    this.store.dispatch(SearchActions.setSearchSortingToggle({showSorting: !this.showSorting}));
  }

  openWindow(id) {
    this.openedWindow = null;
    this.activeBike = {} as Bike;

    this.apiRidesService.getById(id).subscribe(bike => {
      this.activeBike = bike;
      this.openedWindow = id;
    });
  }

  isInfoWindowOpened(id) {
    return this.openedWindow === id;
  }
}
