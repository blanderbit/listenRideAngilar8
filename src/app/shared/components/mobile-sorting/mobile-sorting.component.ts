import {Component} from '@angular/core';
import {sortList} from '@core/constants/filters.const';
import * as SearchActions from '../../../modules/search/store/search.actions';
import {SearchModel} from '../../../modules/search/search.types';
import {Store} from '@ngrx/store';

@Component({
  selector: 'lnr-mobile-sorting',
  templateUrl: './mobile-sorting.component.html',
  styleUrls: ['./mobile-sorting.component.scss']
})
export class MobileSortingComponent {
  sortList = sortList;

  constructor(private store: Store<SearchModel>) {
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
