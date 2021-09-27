import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateInputComponent } from './custom-date-input.component';

describe('CustomDateInputComponent', () => {
  let component: CustomDateInputComponent;
  let fixture: ComponentFixture<CustomDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDateInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
