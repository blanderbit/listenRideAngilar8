// TODO Fix to avoid eslint-ignore
/* eslint-disable */
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SatDatepickerInputEvent,
  SatDatepickerRangeValue,
} from 'saturn-datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchModel, SearchQueryParams } from '../../../search/search.types';

@Component({
  selector: 'lnr-searching-form',
  templateUrl: './searching-form.component.html',
  styleUrls: ['./searching-form.component.scss'],
})
export class SearchingFormComponent implements OnInit {
  @Input() activeSearch = false;

  location: string;

  searchingForm: FormGroup;

  date: SatDatepickerRangeValue<Date>;

  lastDateInput: SatDatepickerRangeValue<Date> | null;

  lastDateChange: SatDatepickerRangeValue<Date> | null;

  maxDate = new Date('20-12-2024');

  // TODO Add generic type to ref to avoid this dumb typing
  @ViewChild('categorySelect', { static: true })
  public categorySelect: TemplateRef<any> & { multiSelectUpdate: any };

  onDateInput = (e: SatDatepickerInputEvent<Date>) =>
    (this.lastDateInput = e.value as SatDatepickerRangeValue<Date>);

  onDateChange = (e: SatDatepickerInputEvent<Date>) =>
    (this.lastDateChange = e.value as SatDatepickerRangeValue<Date>);

  constructor(
    private fb: FormBuilder,
    private store: Store<SearchModel>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.searchingForm = this.fb.group({
      date: [this.date],
      location: ['', Validators.required],
      type: [],
    });

    this.categorySelect.multiSelectUpdate.subscribe(categories => {
      this.searchingForm.get('type').setValue(categories);
    });
  }

  onAutocompleteSelected(selection) {
    this.searchingForm.get('location').setValue(selection.formatted_address);
  }

  formatQueryParams(formData) {
    const searchParams: SearchQueryParams = {
      page: 1,
    };
    if (formData.location) {
      searchParams.location = formData.location;
    }
    if (formData.date) {
      searchParams.start_date = formData.date.begin.toISOString();
      searchParams.duration = Math.round(
        (new Date(formData.date.end).getTime() -
          new Date(formData.date.begin).getTime()) /
          1000,
      );
    }
    if (formData.type) {
      searchParams.category = formData.type.join(',');
    }

    return searchParams;
  }

  onSubmit(selection) {
    const searchPayload = this.formatQueryParams(
      this.searchingForm.getRawValue(),
    );
    this.router.navigate(['/search'], {
      queryParams: { ...searchPayload },
      replaceUrl: true,
    });
  }
}
