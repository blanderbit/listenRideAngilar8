import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'lnr-our-pros',
  templateUrl: './our-pros.component.html',
  styleUrls: ['./our-pros.component.scss']
})
export class OurProsComponent implements OnInit {
  @Input() image: string;
  @Input() title: string;
  @Input() paragraph: string;

  constructor() {
  }

  ngOnInit() {
  }

}
