// TODO Fix to avoid eslint-ignore (see below in file)
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { catchError, map } from 'rxjs/operators';
import { ApiRidesService } from '@api/api-rides/api-rides.service';

@Injectable()
export class BikeResolver implements Resolve<any> {
  constructor(
    private store: Store<fromAuth.State>,
    private activateRoute: ActivatedRoute,
    private apiRidesService: ApiRidesService,
    private router: Router,
  ) {}

  resolve({ queryParams }: ActivatedRouteSnapshot) {
    const { id } = queryParams;
    if (!id) {
      return this.router.navigate(['/404']);
    }
    return this.apiRidesService.getById(id, false).pipe(
      map((data: any) => {
        if (data && data.current) {
          // eslint-disable-next-line no-param-reassign
          data.current.queryParams = queryParams;
        }
        return data.current;
      }),
      catchError(() => this.router.navigate(['/404'])),
    );
  }
}
