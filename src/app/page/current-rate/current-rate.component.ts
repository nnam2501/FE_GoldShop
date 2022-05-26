import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiExchangeRateService } from '../../shared/api-exchange-rate.service';
@Component({
  selector: 'app-current-rate',
  templateUrl: './current-rate.component.html',
  styleUrls: ['./current-rate.component.scss'],
})
export class CurrentRateComponent implements OnInit {
  exchangeForm: FormGroup;
  tmp: any;
  symbols: any;
  a: any;
  @Input() exchange = { to: '', from: '', amount: 0 };

  constructor(
    private http: HttpClient,
    public formBuilder: FormBuilder,
    public apiExchangeRateService: ApiExchangeRateService
  ) {
    this.exchangeForm = this.formBuilder.group({
      to: [''],
      from: [''],
      amount: [0],
    });
  }

  ngOnInit() {
    this.onSymbols();
  }

  onExchange(dataExchange: any) {
    this.apiExchangeRateService.getSymbols().subscribe((data) => {
      console.log(data);
    });
  }
  onSymbols() {
    this.apiExchangeRateService.getSymbols().subscribe((data) => {
      // this.tmp = Object.entries(data.symbols);
      this.tmp = Object.entries(data.symbols).map((item) => {
        return item[1];
      });
      // this.a = {
      //   abc: this.tmp,
      // };
      this.symbols = this.tmp;
      // console.log(this.a.abc[0].description);

      // for (let [key, value] of this.symbols) {
      //   console.log(value);
      // }
      // console.log(this.symbols);
      /*
      symbol: {
        {des,code},{}
      }
       */
    });
  }

  onChange(code: any) {
    console.log(code.target.value);
  }
}
