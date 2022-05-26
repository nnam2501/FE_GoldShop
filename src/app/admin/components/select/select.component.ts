import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() value: any;

  yourModelStore: any; // rendered as this.yourModelStore = ['value', 'value'];
  myValues: any;
  constructor() {}

  ngOnInit(): void {
    this.myValues = this.value;
  }
}
