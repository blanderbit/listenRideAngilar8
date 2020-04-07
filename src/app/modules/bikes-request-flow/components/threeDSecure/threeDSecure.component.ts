import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { STATIC } from '../../consts/consts';
import { environment } from '@environment/environment';

@Component({
  selector: 'lnr-3d-secure',
  templateUrl: './threeDSecure.component.html',
})
export class ThreeDSecureComponent {
  successPageRedirect: string;
  data: any;
  @ViewChild('threeDSecureForm', STATIC) private threeDSecureForm;
  issuerUrl = '';
  paRequest = '';
  md = '';
  originHref = document.location.origin;

  constructor(private cdr: ChangeDetectorRef) {}

  redirectToRequests(id) {
    return `${environment.LNR_API_ENDPOINT}/requests/${id}/authorise3d?site=${this.originHref}`;
  }

  showThreeDSecureAuthentication(requestData) {
    if (requestData.redirect_params) {
      const { issuerUrl, paRequest, md } = requestData.redirect_params;
      if (issuerUrl && paRequest && md) {
        this.issuerUrl = issuerUrl;
        this.paRequest = paRequest;
        this.md = md;
        this.successPageRedirect = this.redirectToRequests(requestData.id);
        this.cdr.detectChanges();
        this.threeDSecureForm.nativeElement.submit();
      }
    }
  }
}
