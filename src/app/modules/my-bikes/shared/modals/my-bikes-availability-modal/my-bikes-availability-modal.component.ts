import { Component, Inject, OnInit } from '@angular/core';
import {
  SatDatepickerInputEvent,
  SatDatepickerRangeValue,
} from 'saturn-datepicker';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lnr-my-bikes-merge-availability-modal',
  templateUrl: './my-bikes-availability-modal.component.html',
  styleUrls: ['./my-bikes-availability-modal.component.scss'],
})
export class MyBikesAvailabilityModalComponent implements OnInit {
  date: SatDatepickerRangeValue<Date>;

  lastDateInput: SatDatepickerRangeValue<Date> | null;

  lastDateChange: SatDatepickerRangeValue<Date> | null;

  maxDate = new Date('20-12-2024');

  availabilityForm: FormGroup;

  availabilityIds: string[];

  onDateInput = (e: SatDatepickerInputEvent<Date>) => {
    this.lastDateInput = e.value as SatDatepickerRangeValue<Date>;
  };

  onDateChange = (e: SatDatepickerInputEvent<Date>) => {
    this.lastDateChange = e.value as SatDatepickerRangeValue<Date>;
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MyBikesAvailabilityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.availabilityIds = Object.keys(this.data.timeSlots);
    this.availabilityForm = this.fb.group({});
    this.availabilityIds.forEach(id =>
      this.availabilityForm.addControl(
        id,
        new FormControl({
          begin: this.data.timeSlots[id].start_date,
          end: new Date(
            new Date(this.data.timeSlots[id].start_date).getTime() / 1000 +
              this.data.timeSlots[id].duration,
          ),
        }),
      ),
    );
  }

  submit() {
    const payload = this.availabilityForm.getRawValue();
    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
