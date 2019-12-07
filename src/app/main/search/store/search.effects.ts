import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import {SearchService} from "../search.service";
import {of} from "rxjs";
import {SuccessGetBikes, ErrorGetBikes, StartGetBikes} from "./search.actions";

@Injectable()
export class SearchEffects {

  loadBikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartGetBikes),
      switchMap((action) => this.searchService.getRide(action.location)
        .pipe(
          map(results => (SuccessGetBikes(results))),
          catchError((error) => of(ErrorGetBikes(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}
}
