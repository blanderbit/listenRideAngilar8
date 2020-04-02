import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryMultiSelectComponent } from '@shared/filters/category-multiselect/category-multi-select.component';
import { SearchModel, SearchQueryParams } from '../../../search/search.types';
import { DatesRange } from '../../../bike/bike-booking-widget/types';

@Component({
  selector: 'lnr-searching-form',
  templateUrl: './searching-form.component.html',
  styleUrls: ['./searching-form.component.scss'],
})
export class SearchingFormComponent implements OnInit, AfterViewInit {
  @Input() activeSearch = false;

  location: string;

  searchingForm: FormGroup;

  public selectedDates: DatesRange;

  @ViewChild(CategoryMultiSelectComponent, { static: false })
  categorySelect: CategoryMultiSelectComponent;

  constructor(
    private fb: FormBuilder,
    private store: Store<SearchModel>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchingForm = this.fb.group({
      location: ['', Validators.required],
      type: [],
    });
  }

  onAutocompleteSelected(selection): void {
    this.searchingForm.get('location').setValue(selection.formatted_address);
  }

  private formatQueryParams = (formData): SearchQueryParams => {
    const searchParams: SearchQueryParams = {
      page: 1,
    };
    if (formData.location) {
      searchParams.location = formData.location;
    }
    if (formData.type) {
      searchParams.category = formData.type.join(',');
    }

    return searchParams;
  };

  onDatesRangeSet({ startDate, endDate }: DatesRange): void {
    this.selectedDates = { startDate: startDate, endDate: endDate };
  }

  onSubmit(): void {
    const searchPayload = this.formatQueryParams(
      this.searchingForm.getRawValue(),
    );

    if (this.selectedDates) {
      const { startDate, endDate } = this.selectedDates;
      // eslint-disable-next-line @typescript-eslint/camelcase
      searchPayload.start_date = startDate.toISOString();
      searchPayload.duration = endDate.diff(startDate, 'seconds');
    }

    this.router.navigate(['/search'], {
      queryParams: { ...searchPayload },
      replaceUrl: true,
    });
  }

  ngAfterViewInit(): void {
    this.categorySelect.multiSelectUpdate.subscribe(categories => {
      this.searchingForm.get('type').setValue(categories);
    });
  }
}
