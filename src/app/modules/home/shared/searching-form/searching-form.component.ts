import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';
import {SearchModel, SearchPayload} from '../../../search/search.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'lnr-searching-form',
  templateUrl: './searching-form.component.html',
  styleUrls: ['./searching-form.component.scss']
})
export class SearchingFormComponent implements OnInit {
  @Input() activeSearch = false;
  location: string;
  searchingForm: FormGroup;
  date: SatDatepickerRangeValue<Date>;
  lastDateInput: SatDatepickerRangeValue<Date> | null;
  lastDateChange: SatDatepickerRangeValue<Date> | null;
  maxDate = new Date('20-12-2024');

  // TODO when category select will work correct
  // @ViewChild('categorySelect', {static: true}) public categorySelect: TemplateRef<any>;

  onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;

  constructor(
    private fb: FormBuilder, private store: Store<SearchModel>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.searchingForm = this.fb.group({
      date: [this.date],
      location: ['', Validators.required],
      type: [],
    });

    // TODO when category select will work correct
    // this.categorySelect[`multiSelectUpdate`]
    //   .subscribe((categories) => {
    //     this.searchingForm.get('type').setValue(categories);
    //   });

  }

  onAutocompleteSelected(selection) {
    this.searchingForm.get('location').setValue(selection.formatted_address);
  }


  formatPayload(formData) {
    const filterPayload: SearchPayload = {
      page: 1
    };
    if (formData.date) {
      filterPayload.start_date = formData.date.begin.toISOString();
      filterPayload.duration = Math.round((new Date(formData.date.end).getTime() - new Date(formData.date.begin).getTime()) / 1000);
    }
    if (formData.type) {
      filterPayload.category = formData.type.join(',');
    }
    if (formData.location) {
      filterPayload.location = formData.location;
    }

    return filterPayload;
  }

  onSubmit(selection) {
    const searchPayload = this.formatPayload(this.searchingForm.getRawValue());
    this.router.navigate(['/search'], {
      queryParams: {...searchPayload},
      replaceUrl: true
    });
  }
}
