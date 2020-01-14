import {Component, OnInit} from '@angular/core';
import * as SearchActions from './search/store/search.actions';
import {Store} from '@ngrx/store';
import {SearchModel} from './search/search.types';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public appearance = 'outline';
  public isLoggedIn = false;

  constructor(private store: Store<SearchModel>,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      'lnr-filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ui_icons/filter_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'lnr-reset-filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ui_icons/reset_filter_icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'lnr-sort',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/sort_icon.svg')
    );

  }

  ngOnInit() {

  }

  onAutocompleteSelected(selection) {
    this.store.dispatch(SearchActions.StartGetBikes({location: selection.formatted_address}));
  }

}
