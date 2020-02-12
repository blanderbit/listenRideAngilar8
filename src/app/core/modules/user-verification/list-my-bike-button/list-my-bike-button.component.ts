import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {UserVerificationActions} from '@user-verification/store/actions';


@Component({
  selector: 'lnr-list-my-bike-button',
  templateUrl: './list-my-bike-button.component.html',
  styleUrls: ['./list-my-bike-button.component.scss']
})
export class ListMyBikeButtonComponent {

  user = this.store.pipe(select(fromAuth.selectAuthGetUser));

  constructor(
    private store: Store<fromAuth.State>
  ) {
  }


  openDialog(e): void {
    e.preventDefault();
    this.store.dispatch(UserVerificationActions.headerOpenUserVerificationDialog());
  }

}