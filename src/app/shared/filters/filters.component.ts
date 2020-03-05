import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {select, Store} from '@ngrx/store';
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';
import {brandList, sizeList, sortList, typeList} from '@core/constants/filters.const';
import {take} from 'rxjs/operators';
import * as SearchActions from '../../modules/search/store/search.actions';
import {SearchModel, SearchPayload} from '../../modules/search/search.types';
import {getFilterPayload, getFilterToggle} from '../../modules/search/store';

@Component({
  selector: 'lnr-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<SearchModel>) {
  }

  filtersForm: FormGroup;
  showFilter: boolean;
  sizeList = sizeList;
  brandList = brandList;
  sortList = sortList;

  @ViewChild('categorySelect', {static: true}) public categorySelect: TemplateRef<any>;

  date: SatDatepickerRangeValue<Date>;
  lastDateInput: SatDatepickerRangeValue<Date> | null;
  lastDateChange: SatDatepickerRangeValue<Date> | null;
  maxDate = new Date('20-12-2024');

  onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;

  ngOnInit() {
    this.filtersForm = this.fb.group({
      date: [this.date],
      size: [],
      type: [],
      brand: [],
      sorting: []
    });

    this.store.pipe(select(getFilterToggle))
      .subscribe(showFilter => this.showFilter = showFilter);

    this.store.pipe(select(getFilterPayload), take(1))
      .subscribe(filters => {
        this.filtersForm.patchValue({
          date: filters.start_date ? {
                  begin: filters.start_date,
                  end: new Date(new Date(filters.start_date).getTime() + (filters.duration * 1000))
                } : null,
          size: filters.height || null,
          type: filters.category ? filters.category.split(',') : null,
          brand: filters.brand ? filters.brand.split(',') :  null,
          sorting: filters.sort_direction && filters.sort_by ? `${filters.sort_by}-${filters.sort_direction}` : null
        });
      });

    this.categorySelect[`multiSelectUpdate`]
      .subscribe((categories) => {
        this.filtersForm.get('type').setValue(categories);
      });

    this.filtersForm.valueChanges.subscribe(val => {
      this.store.dispatch(SearchActions.SetSearchMetaData({metaData: {page: 1}}));
      this.store.dispatch(SearchActions.SetSearchPayload(this.formatPayload(val)));
    });
  }

  formatPayload(formData) {
    const filterPayload: SearchPayload = {};

    if (formData.date && formData.date.begin) {
      filterPayload.start_date = formData.date.begin.toISOString();
      filterPayload.duration = Math.round((new Date(formData.date.end).getTime() - new Date(formData.date.begin).getTime()) / 1000);
    }
    if (formData.size)  { filterPayload.height = formData.size; }
    if (formData.type)  { filterPayload.category = formData.type.length > 0 ? formData.type.join(',') : []; }
    if (formData.brand) { filterPayload.brand = formData.brand.length > 0 ? formData.brand.join(',') : []; }
    if (formData.sorting) {
      const sortParams = formData.sorting.split('-');
      filterPayload.sort_by = sortParams[0];
      filterPayload.sort_direction = sortParams[1];
    }

    console.log(filterPayload);
    return filterPayload;
  }

  reset() {
    this.filtersForm.markAsUntouched();
    this.filtersForm.reset();
    this.store.dispatch(SearchActions.ResetSearchPayload());
  }

  close() {
    this.store.dispatch(SearchActions.setSearchFilterToggle({showFilter: false}));
  }

  applyFilters() {
    this.close();
  }

}
