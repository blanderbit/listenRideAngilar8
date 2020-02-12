import {Component, Inject, OnInit} from '@angular/core';
import {SatDatepickerInputEvent, SatDatepickerRangeValue} from "saturn-datepicker";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'lnr-my-bikes-merge-availability-modal',
  templateUrl: './my-bikes-availability-modal.component.html',
  styleUrls: ['./my-bikes-availability-modal.component.scss']
})
export class MyBikesAvailabilityModalComponent implements OnInit {
  date: SatDatepickerRangeValue<Date>;
  lastDateInput: SatDatepickerRangeValue<Date> | null;
  lastDateChange: SatDatepickerRangeValue<Date> | null;
  maxDate = new Date('20-12-2024');
  availabilityForm: FormGroup;

  onDateInput = (e: SatDatepickerInputEvent<Date>) => this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  onDateChange = (e: SatDatepickerInputEvent<Date>) => this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<MyBikesAvailabilityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.availabilityForm = this.fb.group({
      start: [this.date],
      end: [],
    });
  }

  submit() {
    const payload = this.availabilityForm.getRawValue();
    this.dialogRef.close(payload);
  }
  close() {
    this.dialogRef.close();
  }

}
