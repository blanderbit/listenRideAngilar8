import {Component, OnInit, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {User} from '@models/user/user';
import {HttpErrorResponse} from '@angular/common/http';
import {RatingComponent} from 'ngx-bootstrap';
import {UserVerificationActions} from '@user-verification/store/actions';
import {Store} from '@ngrx/store';
import * as fromUserVerification from '@core/modules/user-verification/store/reducers';

@Component({
  selector: 'lnr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User;
  error: HttpErrorResponse;

  @ViewChild('rating', {static: true}) rating: RatingComponent;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<fromUserVerification.State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserVerificationActions.openUserVerificationDialogFromListBike());
    this.activateRoute.data.pipe(take(1))
      .subscribe(({user}) => {
        this.user = user;
        this.initRating(this.user.rating_rider);
        this.checkUserVerification(user);
      }, (error) => {
        this.error = error;
      });
  }

  private checkUserVerification(user: User) {
    if (!user) {
      return;
    }
    if (!user.confirmed_email || !user.confirmed_phone) {
      // this.store.dispatch(UserVerificationActions.openUserVerificationDialogFromListBike());
    }
  }

  private initRating(rating: number) {
    this.rating.writeValue(rating);
  }
}
