import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'lnr-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

    this.matIconRegistry
      .addSvgIcon(
      'lnr-filter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ui_icons/filter_icon.svg')
    )
      .addSvgIcon(
        'lnr-reset-filter',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ui_icons/reset_filter_icon.svg')
      )
      .addSvgIcon(
        'lnr-sort',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/ui_icons/sort_icon.svg')
      );
  }

  ngOnInit() {

  }

}
