import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lnr-my-bikes-delete-modal',
  templateUrl: './my-bikes-delete-modal.component.html',
  styleUrls: ['./my-bikes-delete-modal.component.scss']
})
export class MyBikesDeleteModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MyBikesDeleteModalComponent>,
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
