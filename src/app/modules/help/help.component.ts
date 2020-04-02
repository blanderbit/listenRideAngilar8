import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiFaqsService, FaqsData, FaqGroup, Faq } from '@api/api-faqs';
import { questionsColumn } from './helpers/helpers';

@Component({
  selector: 'lnr-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  faqsData$: Observable<boolean | FaqsData>;
  questionsColumn = questionsColumn;

  constructor(
    private apiFaqsService: ApiFaqsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.faqsData$ = this.apiFaqsService.getFaqs();
  }
}
