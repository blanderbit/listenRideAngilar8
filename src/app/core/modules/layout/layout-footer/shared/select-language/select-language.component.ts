import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchModel } from '../../../../../../modules/search/search.types';

export interface Languages {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'lnr-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<SearchModel>) {}

  public form: FormGroup;

  languages: Languages[] = [
    {
      viewValue: 'English',
      value: 'en',
    },
    {
      viewValue: 'German',
      value: 'de',
    },
    {
      viewValue: 'Dutch',
      value: 'nl',
    },
    {
      viewValue: 'Italian',
      value: 'it',
    },
    {
      viewValue: 'French',
      value: 'fr',
    },
  ];

  ngOnInit() {
    this.form = this.fb.group({
      language: [],
    });
  }
}
