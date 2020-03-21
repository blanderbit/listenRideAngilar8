import { Component, Input } from '@angular/core';

@Component({
  selector: 'lnr-insurance-partners',
  templateUrl: './insurance-partners.component.html',
  styleUrls: ['./insurance-partners.component.scss'],
})
export class InsurancePartnersComponent {
  @Input() title: '';
}
