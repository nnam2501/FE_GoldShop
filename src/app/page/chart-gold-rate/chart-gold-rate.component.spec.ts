import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGoldRateComponent } from './chart-gold-rate.component';

describe('ChartGoldRateComponent', () => {
  let component: ChartGoldRateComponent;
  let fixture: ComponentFixture<ChartGoldRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGoldRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGoldRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
