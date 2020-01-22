import {Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {SearchModel} from '../search/search.types';
import * as SearchActions from '../search/store/search.actions';

@Component({
  selector: 'lnr-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() activeSearch = false;
  reason = '';

  constructor(private store: Store<SearchModel>) {
  }


  ngOnInit() {
  }

  onAutocompleteSelected(selection) {
    this.store.dispatch(SearchActions.StartGetBikes({location: selection.formatted_address}));
  }

  showSearch($event) {
    this.activeSearch = true;
  }

  close(reason: string) {
    this.reason = reason;
    this.activeSearch = false;
  }
}
