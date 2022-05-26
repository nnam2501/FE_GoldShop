import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss'],
})
export class CancelDialogComponent implements OnInit {
  data: any;
  content: any;
  constructor(protected dialogRef: NbDialogRef<CancelDialogComponent>) {}

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.content);
  }
  cancel() {
    this.dialogRef.close();
  }
  submit() {}
}
