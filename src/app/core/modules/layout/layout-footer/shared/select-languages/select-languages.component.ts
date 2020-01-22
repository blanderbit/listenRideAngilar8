import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

}
