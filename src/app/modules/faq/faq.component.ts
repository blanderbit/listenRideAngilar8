import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiFaqsService, FaqsData, FaqGroup, Faq } from '@api/api-faqs';
import find from 'lodash-es/find';
import { backgroundImage } from './helpers/helpers';

@Component({
  selector: 'lnr-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  chosenGroupId: number;
  faqsData$: Observable<boolean | FaqsData>;
  find = find;
  backgroundImage = backgroundImage;

  constructor(
    private apiFaqsService: ApiFaqsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.chosenGroupId = Number(this.route.snapshot.queryParams['group']);
    this.faqsData$ = this.apiFaqsService.getFaqs();
  }

  selectGroup(id: number) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { group: id },
    });
    this.location.replaceState(urlTree.toString());
    this.chosenGroupId = id;
  }
}
