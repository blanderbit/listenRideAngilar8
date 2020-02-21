import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lnr-my-bikes-merge-modal',
  templateUrl: './my-bikes-merge-modal.component.html',
  styleUrls: ['./my-bikes-merge-modal.component.scss']
})
export class MyBikesMergeModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MyBikesMergeModalComponent>,
  ) { }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close({approved: true});
  }
  close() {
    this.dialogRef.close({approved: false});
  }

}
