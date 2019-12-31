import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as SearchActions from "../../main/search/store/search.actions";
import {Store} from "@ngrx/store";
import {SearchModel} from "../../main/search/search.types";
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from "saturn-datepicker";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
 public filtersForm: FormGroup;
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

  this.filtersForm.valueChanges.subscribe(val => {
    console.log(val.date);
    if (val.date) {
     const filterPayload = {
       startDate: val.date.begin,
       duration: Math.round((new Date(val.date.end).getTime() - new Date(val.date.begin).getTime())/1000)
     };

     this.store.dispatch(SearchActions.GetUnavailableBikes(filterPayload));
    }
    // this.store.dispatch(SearchActions.StartGetBikes({location: 'Berlin', sizes: val.size}));
  });

  }

}
