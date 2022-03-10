import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonFieldComponent } from './toggle-button-field.component';

describe('ToggleButtonFieldComponent', () => {
  let component: ToggleButtonFieldComponent;
  let fixture: ComponentFixture<ToggleButtonFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleButtonFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
