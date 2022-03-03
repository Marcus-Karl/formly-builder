import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyInputFieldComponent } from './currency-input-field.component';

describe('SingleLineCurrencyInputFieldComponent', () => {
  let component: CurrencyInputFieldComponent;
  let fixture: ComponentFixture<CurrencyInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
