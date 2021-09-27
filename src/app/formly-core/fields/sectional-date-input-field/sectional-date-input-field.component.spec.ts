import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionalDateInputFieldComponent } from './sectional-date-input-field.component';

describe('DateInputFieldComponent', () => {
  let component: SectionalDateInputFieldComponent;
  let fixture: ComponentFixture<SectionalDateInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionalDateInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionalDateInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
