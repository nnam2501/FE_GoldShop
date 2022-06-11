import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
@Component({
  selector: 'app-fileinput',
  templateUrl: './fileinput.component.html',
  styleUrls: ['./fileinput.component.scss'],
})
export class FileinputComponent extends DefaultEditor {
  url: any;
  constructor() {
    super();
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.cell.newValue = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // this.cell.newValue = event.target.result;
  }
}
