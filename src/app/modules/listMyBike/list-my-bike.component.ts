import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'lnr-list-my-bike',
  templateUrl: './list-my-bike.component.html',
  styleUrls: ['./list-my-bike.component.scss']
})
export class ListMyBikeComponent implements OnInit{
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

    constructor(
      private store: Store<any>,
      private _formBuilder: FormBuilder
      ) {
      this.store
      //     .pipe(
      //     select(getBikes),
      // //     filter((bikes) => !!bikes)
      // )
          .subscribe(test => console.log('test', test));
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  close() {

  }
}
