import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsAndHintsComponent } from './errors-and-hints.component';

describe('ErrorsAndHintsComponent', () => {
  let component: ErrorsAndHintsComponent;
  let fixture: ComponentFixture<ErrorsAndHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsAndHintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsAndHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
