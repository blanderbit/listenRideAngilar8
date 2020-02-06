import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import * as SearchActions from './store/search.actions';
import {SearchModel, Location, SearchPayload} from './search.types';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {Bike} from '@core/models/bike/bike.types';
import {getBikes, getBikesPins, getFilterPayload, getFilterToggle, getLocations, getSortingToggle} from './store';
import {mapClusterStyle, mapColorScheme, mapDefaultOptions} from '@core/constants/map-config';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lnr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public bikes: Bike[];
  public page =  1;
  public pageAmount = 21;
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
              private deviceService: DeviceDetectorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(SearchActions.SetSearchPayload({ page: this.page, limit: this.pageAmount }));
    this.isTablet = this.deviceService.isTablet();
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();

    this.route.queryParamMap
      .pipe(take(1))
      .subscribe((paramMap) => {
        const queryParams: SearchPayload = {
          location: paramMap.get('location') || null,
          page: paramMap.get('page') ? parseInt(paramMap.get('page'), 10) : null,
          limit: paramMap.get('limit') ? parseInt(paramMap.get('limit'), 10) : null,
          category: paramMap.get('category') || null,
          height: paramMap.get('height') ? parseInt(paramMap.get('height'), 10) : null,
          brand: paramMap.get('brand') || null,
          sort_by: paramMap.get('sort_by') || null,
          sort_direction: paramMap.get('sort_direction') || null,
          start_date: paramMap.get('start_date') ? new Date(paramMap.get('start_date')) : null,
          duration: paramMap.get('duration') ? parseInt(paramMap.get('duration'), 10) : null,
        };
        console.log('params', queryParams);
        this.store.dispatch(SearchActions.SetSearchPayload(queryParams));
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

    this.store.pipe(
        select(getFilterPayload),
        filter(filterPayload => !!filterPayload && !!filterPayload.location)
      )
      .subscribe(filterPayload =>  {
        this.filterPayload = {...filterPayload};
        this.store.dispatch(SearchActions.GetBikes());

        this.router.navigate([], {
          queryParams: { ...filterPayload },
          replaceUrl: true
        });
      });

    this.store.pipe(select(getFilterToggle))
      .subscribe(showFilter => this.showFilter = showFilter);

    this.store.pipe(select(getSortingToggle))
      .subscribe(showSorting =>  this.showSorting = showSorting );
  }

  onScrollDown(ev) {
    this.scrolled = true;
    this.filterPayload.page++;
    this.store.dispatch(SearchActions.SetSearchPayload(this.filterPayload));
  }

  onScrollUp(ev) {
    this.scrolled = false;
    console.log(this.scrolled);
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

    this.SearchService.getSingleBike(id).subscribe(bike => {
      this.activeBike = bike;
      this.openedWindow = id;
    });
  }

  isInfoWindowOpened(id) {
    return this.openedWindow === id;
  }
}
