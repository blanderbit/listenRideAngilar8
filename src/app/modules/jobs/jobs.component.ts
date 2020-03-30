import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { imagesAmazonFolder } from '@core/constants/external-path';
import { ApiJobsService } from '@api/api-jobs';

import { Job } from '@models/jobs/jobs';

@Component({
  selector: 'lnr-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, OnDestroy {
  MAIN_IMAGE_URL = `${imagesAmazonFolder}/jobs/jobs-main-img.jpg`;
  expanedJobId: number;
  jobs$: Observable<boolean | Array<Job>>;
  private destroyed$ = new Subject();

  constructor(
    private apiJobsService: ApiJobsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.expanedJobId = Number(this.route.snapshot.queryParams['position']);
    this.jobs$ = this.apiJobsService.getJobs();
  }

  addParam(jobId: number) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { position: jobId },
    });
    this.location.replaceState(urlTree.toString());
  }

  removeParam() {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { position: null },
    });
    this.location.replaceState(urlTree.toString());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
