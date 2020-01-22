import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-insurance-partners',
  templateUrl: './insurance-partners.component.html',
  styleUrls: ['./insurance-partners.component.scss']
})
export class InsurancePartnersComponent implements OnInit {
  @Input() title: '';

  constructor() {
  }

  ngOnInit() {
  }

}
