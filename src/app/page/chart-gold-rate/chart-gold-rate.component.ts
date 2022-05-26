import { Component, AfterViewInit } from '@angular/core';

declare const TradingView: any;

@Component({
  selector: 'app-chart-gold-rate',
  templateUrl: './chart-gold-rate.component.html',
  styleUrls: ['./chart-gold-rate.component.scss'],
})
export class ChartGoldRateComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    new TradingView.widget({
      width: 800,
      height: 500,
      // symbol: 'HOSE:PNJ',
      // symbol: 'FOREXCOM:XAUUSD',
      symbol: 'FX_IDC:XAUUSD',
      hide_top_toolbar: true,
      interval: 1,
      timezone: 'Asia/Ho_Chi_Minh',
      theme: 'light',
      style: '1',
      locale: 'vi_VN',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      details: true,
      withdateranges: true,
      watchlist: ['FX_IDC:XAUUSD', 'FX_IDC:XAUUSDG', 'FX_IDC:XAUUSDK'],
      container_id: 'chart-gold-rate',
    });
  }
}
