import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {SearchModel} from '../../../../../../main/search/search.types';

export interface Languages {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'lnr-select-languages',
  templateUrl: './select-languages.component.html',
  styleUrls: ['./select-languages.component.scss']
})

export class SelectLanguagesComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<SearchModel>) {
  }

  public form: FormGroup;

  languages: Languages[] = [
    {
      viewValue: 'English',
      value: 'en'
    },
    {
      viewValue: 'German',
      value: 'de'
    },
    {
      viewValue: 'Dutch',
      value: 'nl'
    },
    {
      viewValue: 'Italian',
      value: 'it'
    },
    {
      viewValue: 'French',
      value: 'fr'
    }
  ];


  ngOnInit() {
    this.form = this.fb.group({
      language: [],
    });
  }

}
