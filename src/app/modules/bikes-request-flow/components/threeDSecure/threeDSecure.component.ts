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

  constructor(private cdr: ChangeDetectorRef) {}
  showThreeDSecureAuthentication(requestData) {
    const { issuerUrl, paRequest, md } = requestData.redirect_params;
    this.issuerUrl = issuerUrl;
    this.paRequest = paRequest;
    this.md = md;
    this.successPageRedirect = `${environment.LNR_API_ENDPOINT}/requests/${requestData.id}/authorise3d?site=${document.location.origin}/my-bikes`;
    this.cdr.detectChanges();

    this.threeDSecureForm.nativeElement.submit();
  }
}
