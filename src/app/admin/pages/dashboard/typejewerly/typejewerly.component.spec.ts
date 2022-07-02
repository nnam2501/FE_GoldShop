import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypejewerlyComponent } from './typejewerly.component';

describe('TypejewerlyComponent', () => {
  let component: TypejewerlyComponent;
  let fixture: ComponentFixture<TypejewerlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypejewerlyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypejewerlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
