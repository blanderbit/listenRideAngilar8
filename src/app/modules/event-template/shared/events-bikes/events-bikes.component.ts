import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sizeList } from '@core/constants/filters.const';

@Component({
  selector: 'lnr-events-bikes',
  templateUrl: './events-bikes.component.html',
  styleUrls: ['./events-bikes.component.scss'],
})
export class EventsBikesComponent implements OnInit {
  @Input() bikes;

  constructor(private fb: FormBuilder) {}

  eventsSortingForm: FormGroup;

  sizeList = sizeList;

  ngOnInit() {
    this.eventsSortingForm = this.fb.group({
      size: [],
    });
  }
}
