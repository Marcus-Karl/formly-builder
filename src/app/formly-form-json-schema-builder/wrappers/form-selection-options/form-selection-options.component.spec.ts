import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectionOptionsComponent } from './form-selection-options.component';

describe('FormSelectionOptionsComponent', () => {
  let component: FormSelectionOptionsComponent;
  let fixture: ComponentFixture<FormSelectionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSelectionOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
