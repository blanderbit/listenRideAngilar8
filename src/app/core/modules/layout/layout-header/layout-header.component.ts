import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {SearchModel} from '../../../../modules/search/search.types';
import * as SearchActions from '../../../../modules/search/store/search.actions';

@Component({
  selector: 'lnr-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {
  @Input() activeSearch = false;
  reason: string;
  location: string;

  constructor(
    private store: Store<SearchModel>,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    const currentLocation = this.route.snapshot.queryParamMap.get('location');
    if (currentLocation) {
      this.search(currentLocation);
      this.location = currentLocation;
    }
  }

  onAutocompleteSelected(selection) {
    this.search(selection.formatted_address);
  }

  search(searchLocation) {
    this.store.dispatch(SearchActions.SetSearchPayload({
      location: searchLocation,
      page: 1,
      limit: 21,
    }));
  }

  showSearch($event) {
    this.activeSearch = true;
  }

  close(reason: string) {
    this.reason = reason;
    this.activeSearch = false;
  }
}
