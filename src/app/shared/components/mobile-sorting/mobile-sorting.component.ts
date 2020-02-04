import { Component, OnInit } from '@angular/core';
import { sortList } from '@core/constants/filters.const';
import * as SearchActions from '../../../main/search/store/search.actions';
import {Store} from '@ngrx/store';
import {SearchModel} from '../../../main/search/search.types';

@Component({
  selector: 'lnr-mobile-sorting',
  templateUrl: './mobile-sorting.component.html',
  styleUrls: ['./mobile-sorting.component.scss']
})
export class MobileSortingComponent implements OnInit {
  sortList = sortList;

  constructor(private store: Store<SearchModel>) { }

  ngOnInit() {
  }

  sort(sorter) {
    if (sorter) {
      const sortParams = sorter.split('-');
      const payload = {
        sort_by: sortParams[0],
        sort_direction: sortParams[1]
      };
      this.store.dispatch(SearchActions.SetSearchPayload(payload));
    }
  }

  close() {
    this.store.dispatch(SearchActions.setSearchSortingToggle({showSorting: false}));
  }

}
