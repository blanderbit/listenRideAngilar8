import { Component, OnInit } from '@angular/core';
import { BrandInfo } from '@api/api-brands/types';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBrandsService } from '@api/api-brands';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'lnr-brand-template',
  templateUrl: './brand-template.component.html',
  styleUrls: ['./brand-template.component.scss'],
})
export class BrandTemplateComponent implements OnInit {
  public brand$: Observable<boolean | BrandInfo>;

  constructor(
    private route: ActivatedRoute,
    private apiBrandsService: ApiBrandsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.brand$ = this.route.params.pipe(
      switchMap(({ name }) => this.apiBrandsService.getBrand(name)),
      catchError(() => this.router.navigate(['404'])),
    );
  }
}
