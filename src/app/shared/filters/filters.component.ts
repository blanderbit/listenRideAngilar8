import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as SearchActions from "../../main/search/store/search.actions";
import {select, Store} from "@ngrx/store";
import {SearchModel} from "../../main/search/search.types";
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from "saturn-datepicker";
import {getFilterToggle} from "../../main/search/store";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
 public filtersForm: FormGroup;
 public showFilter: boolean;
 public sizeList = [
   {
     text: 'All Sizes',
     value: -1,
   },
   {
     text: 'Unisize',
     value: 0,
   },
   {
     text: '155-165',
     value: 155
   },
   {
     text: '165-175',
     value: 165
   }
 ];
 public typeList = [{
   text: 'Urban',
   value: 10,
 },
   {
     text: 'Urban2',
     value: 11,
   },
   {
     text: 'Urban3',
     value: 12
   },
   {
     text: 'Urban4',
     value: 13
   }];
  date: SatDatepickerRangeValue<Date> ;
  lastDateInput: SatDatepickerRangeValue<Date>  | null;
  lastDateChange: SatDatepickerRangeValue<Date>  | null;

  onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;
  maxDate = new Date('20-12-2024');

  constructor(private fb: FormBuilder, private store: Store<SearchModel>) { }

  ngOnInit() {
    this.filtersForm = this.fb.group({
      date: [this.date],
      size: [[]],
      type: [[]],
      brand: ['Test']
    });

    this.store.pipe(select(getFilterToggle))
      .subscribe(showFilter => this.showFilter = showFilter);

    this.filtersForm.valueChanges.subscribe(val => {
       this.store.dispatch(SearchActions.GetUnavailableBikes(this.formatPayload(val)));
    });

  }

  formatPayload(formData) {
    let filterPayload =  {
      startDate: null,
      duration: null
    };
      if(formData.date) {
        filterPayload.startDate = formData.date.begin;
        filterPayload.duration =  Math.round((new Date(formData.date.end).getTime() - new Date(formData.date.begin).getTime())/1000);
      }

      return filterPayload;
  }

  reset() {
    this.filtersForm.markAsUntouched();
    this.filtersForm.reset();
  }

  close() {
    this.store.dispatch(SearchActions.setSearchFilterToggle({showFilter: false}));
  }

  applyFilters() {
    let filterPayload = { ...this.filtersForm.getRawValue() };
    this.store.dispatch(SearchActions.GetUnavailableBikes(this.formatPayload(filterPayload)));
    this.close();
  }

}
