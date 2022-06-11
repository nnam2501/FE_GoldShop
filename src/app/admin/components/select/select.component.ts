import { Component, Input, OnInit, Output } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { TypejewerlyService } from '../../../services/typejewerly/typejewerly.service';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
// export class SelectComponent implements OnInit {
//   @Output() selected: any[] = [];
//   dataType: any;
//   yourModelStore: any[] = [];

//   constructor(private api: TypejewerlyService) {}

//   ngOnInit(): void {
//     this.api.getType().subscribe((res) => {
//       this.dataType = res;
//     });
//   }

//   selectChange(event: any) {
//     console.log(event);

//     this.selected = event;
//     console.log(this.selected);
//   }
// }
export class SelectComponent extends DefaultEditor implements OnInit {
  dataType: any;
  constructor(private api: TypejewerlyService) {
    super();
  }
  ngOnInit(): void {
    this.api.getType().subscribe((res) => {
      this.dataType = res;
    });
  }
}
