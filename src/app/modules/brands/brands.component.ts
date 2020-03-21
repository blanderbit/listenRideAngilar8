import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ApiBrandsService, Brand } from '@api/api-brands';

@Component({
  selector: 'lnr-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  brandsList$: Observable<Array<Brand>>;

  columnsNum = 2;

  constructor(
    private brandsService: ApiBrandsService,
    public breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.getBrandsList();

    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe(({ breakpoints }: BreakpointState) => {
        this.columnsNum = breakpoints[Breakpoints.XSmall] ? 2 : 4;
      });
  }

  getBrandsList() {
    this.brandsList$ = this.brandsService.getAll();
  }
}
