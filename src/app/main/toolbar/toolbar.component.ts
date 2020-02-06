import {Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {SearchModel} from '../search/search.types';
import * as SearchActions from '../search/store/search.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lnr-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() activeSearch = false;
  reason = '';
  location: string;

  constructor(private store: Store<SearchModel>, private route: ActivatedRoute) {
  }


  ngOnInit() {
    const currentLocation  = this.route.snapshot.queryParamMap.get('location');
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
