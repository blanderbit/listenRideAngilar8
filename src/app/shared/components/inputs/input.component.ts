import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class LnrErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'lnr-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() inputType: string;
  @Input() inputsLabel: string;
  @Input() group: FormGroup;
  @Input() required = false;
  @Input() index = undefined;
  matcher = new LnrErrorStateMatcher();

  constructor() {
  }

  ngOnInit() {
  }

}
