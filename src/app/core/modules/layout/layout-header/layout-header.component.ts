import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchModel} from '../../../../modules/search/search.types';
import * as SearchActions from '../../../../modules/search/store/search.actions';
import * as fromAuth from '@auth/store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'lnr-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  @Input() activeSearch = false;
  reason: string;
  location: string;
  destroyed$ = new Subject();

  isLoggedIn$ = this.storeAuth.pipe(select(fromAuth.isLoggedIn));
  user$ = this.storeAuth.pipe(select(fromAuth.selectAuthGetUser));

  constructor(
    private store: Store<SearchModel>,
    private storeAuth: Store<fromAuth.State>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        this.location = paramMap.get('location');
      });
  }

  onAutocompleteSelected(selection) {
    this.search(selection.formatted_address);
  }

  search(searchLocation) {
    this.store.dispatch(SearchActions.SetSearchMetaData({
      metaData: {
        location: searchLocation,
        page: 1
      }
    }));
  }

  showSearch($event) {
    this.activeSearch = true;
  }

  close(reason: string) {
    this.reason = reason;
    this.activeSearch = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
