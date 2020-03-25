import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ApiInvoicesService, Reports } from '@api/api-invoices';
import { catchError, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { takeUntil } from 'rxjs/operators';
import isEmpty from 'lodash-es/isEmpty';

type TabType = 'asLister' | 'asRider' | 'settlementHistory';

@Component({
  selector: 'lnr-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  tabType: TabType = 'asLister';
  userId: number;
  isMobile: boolean = false;
  user$ = this.storeAuth.pipe(select(fromAuth.selectUser));
  reports$: Observable<boolean | Reports>;
  private destroyed$ = new Subject();

  isEmpty = isEmpty;

  constructor(
    private apiInvoicesService: ApiInvoicesService,
    private storeAuth: Store<fromAuth.State>,
    private deviceDetectorService: DeviceDetectorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(({ id }) => {
      this.userId = id;
    });
    this.reports$ = this.route.params.pipe(
      switchMap(() => this.apiInvoicesService.getReports(this.userId)),
      catchError(() => this.router.navigate(['404'])),
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleTab(tabType: TabType) {
    this.tabType = tabType;
  }
}
