import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lnr-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {
  NEED_HELP_IMAGE = require('assets/images/need-help/lnr_support_jean@2x.jpg');

  constructor() {
  }

  ngOnInit() {
  }

}
