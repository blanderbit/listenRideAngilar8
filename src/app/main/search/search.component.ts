import { Component, OnInit } from '@angular/core';
import {SearchService} from './search.service';
import * as SearchActions from './store/search.actions';
import SearchModel from "./search.types";
import {select, Store} from "@ngrx/store";
import {filter, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {getBikes} from "./store";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private rides$: Observable<any>;

  constructor(private SearchService: SearchService, private store: Store<SearchModel>) {
  }

  ngOnInit() {
    this.store.dispatch(SearchActions.StartGetBikes({location: 'berlin'}));

    this.store.pipe(
      select(getBikes),
      filter((bikes) => !!bikes)
      )
      .subscribe(bikes => this.rides$ = of(bikes));
  }
}
