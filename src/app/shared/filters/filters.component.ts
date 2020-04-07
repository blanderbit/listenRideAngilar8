// TODO Fix all the esLint errors
/* eslint-disable */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { brandList, sizeList, sortList } from '@core/constants/filters.const';
import { take } from 'rxjs/operators';
import { CategoryMultiSelectComponent } from '@shared/filters/category-multiselect/category-multi-select.component';
import { DatesRange } from '@shared/components/bike-booking-widget/types';
import * as moment from 'moment';
import { SearchModel, SearchPayload } from '@modules/search/search.types';
import * as SearchActions from '../../modules/search/store/search.actions';
import { getFilterPayload, getFilterToggle } from '../../modules/search/store';

@Component({
  selector: 'lnr-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder, private store: Store<SearchModel>) {}

  filtersForm: FormGroup;

  showFilter: boolean;

  sizeList = sizeList;

  brandList = brandList;

  sortList = sortList;

  @ViewChild(CategoryMultiSelectComponent, { static: false })
  categorySelect: CategoryMultiSelectComponent;

  public selectedDates: { endDate: moment.Moment; startDate: moment.Moment };

  onDatesRangeSet({ startDate, endDate }: DatesRange): void {
    this.selectedDates = { startDate, endDate };
  }

  ngOnInit() {
    this.filtersForm = this.fb.group({
      size: [],
      type: [],
      brand: [],
      sorting: [],
    });

    this.store.pipe(select(getFilterToggle)).subscribe(showFilter => {
      this.showFilter = showFilter;
    });

    this.store.pipe(select(getFilterPayload), take(1)).subscribe(filters => {
      if (filters.start_date && filters.duration) {
        const startDate = moment(filters.start_date);
        const endDate = moment(startDate).add(filters.duration, 'seconds');

        this.selectedDates = { startDate, endDate };
      }
      this.filtersForm.patchValue({
        size: filters.height || null,
        type: filters.category ? filters.category.split(',') : null,
        brand: filters.brand ? filters.brand.split(',') : null,
        sorting:
          filters.sort_direction && filters.sort_by
            ? `${filters.sort_by}-${filters.sort_direction}`
            : null,
      });
    });

    this.filtersForm.valueChanges.subscribe(val => {
      this.store.dispatch(
        SearchActions.SetSearchMetaData({ metaData: { page: 1 } }),
      );
      this.store.dispatch(
        SearchActions.SetSearchPayload(this.formatPayload(val)),
      );
    });
  }

  formatPayload(formData) {
    const filterPayload: SearchPayload = {};
    const { startDate, endDate } = this.selectedDates;

    if (startDate) {
      filterPayload.start_date = startDate.toISOString();
      filterPayload.duration = endDate.diff(startDate, 'seconds');
    }
    if (formData.size) {
      filterPayload.height = formData.size;
    }
    if (formData.type) {
      filterPayload.category =
        formData.type.length > 0 ? formData.type.join(',') : [];
    }
    if (formData.brand) {
      filterPayload.brand =
        formData.brand.length > 0 ? formData.brand.join(',') : [];
    }
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
    this.selectedDates = null;
  }

  close() {
    this.store.dispatch(
      SearchActions.setSearchFilterToggle({ showFilter: false }),
    );
  }

  applyFilters() {
    this.close();
  }

  ngAfterViewInit() {
    this.categorySelect.multiSelectUpdate.subscribe(categories => {
      this.filtersForm.get('type').setValue(categories);
    });
  }
}
