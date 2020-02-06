import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as SearchActions from '../../main/search/store/search.actions';
import {select, Store} from '@ngrx/store';
import {SearchModel, SearchPayload} from '../../main/search/search.types';
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';
import {sizeList, typeList, brandList, sortList} from '@core/constants/filters.const';
import {getFilterPayload, getFilterToggle} from '../../main/search/store';
import {take} from 'rxjs/operators';

@Component({
  selector: 'lnr-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<SearchModel>) {
  }

  public filtersForm: FormGroup;
  public showFilter: boolean;
  public sizeList = sizeList;
  public typeList = typeList;
  public brandList = brandList;
  public sortList = sortList;

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
          date: filters.start_date || 'null',
          size: filters.height || null,
          type: filters.category ? filters.category.split(',') : [],
          brand: filters.brand ? filters.brand.split(',') :  [],
          sorting: filters.sort_direction && filters.sort_by ? `${filters.sort_by}-${filters.sort_direction}` : null

        });
      });

    this.filtersForm.valueChanges.subscribe(val => {
      this.store.dispatch(SearchActions.SetSearchPayload(this.formatPayload(val)));
    });
  }

  formatPayload(formData) {
    const filterPayload: SearchPayload = {
      page: 1
    };

    if (formData.date) {
      filterPayload.start_date = formData.date.begin;
      filterPayload.duration = Math.round((new Date(formData.date.end).getTime() - new Date(formData.date.begin).getTime()) / 1000);
    }
    if (formData.size) { filterPayload.height = formData.size; }
    if (formData.type) { filterPayload.category = formData.type.join(','); }
    if (formData.brand) { filterPayload.brand = formData.brand.join(','); }
    if (formData.sorting) {
      const sortParams = formData.sorting.split('-');
      filterPayload.sort_by = sortParams[0];
      filterPayload.sort_direction = sortParams[1];
    }

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
