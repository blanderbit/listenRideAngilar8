import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SearchModel} from '../../../search/search.types';
import * as SearchActions from '../../../search/store/search.actions';
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';

@Component({
  selector: 'lnr-searching-form',
  templateUrl: './searching-form.component.html',
  styleUrls: ['./searching-form.component.scss']
})
export class SearchingFormComponent implements OnInit {
  @Input() activeSearch = false;
  date: SatDatepickerRangeValue<Date>;
  lastDateInput: SatDatepickerRangeValue<Date> | null;
  lastDateChange: SatDatepickerRangeValue<Date> | null;
  maxDate = new Date('20-12-2024');

  onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;

  constructor(private store: Store<SearchModel>) {
  }

  ngOnInit() {
  }

  // onAutocompleteSelected(selection) {
  //   this.store.dispatch(SearchActions.StartGetBikes({location: selection.formatted_address}));
  // }

}
