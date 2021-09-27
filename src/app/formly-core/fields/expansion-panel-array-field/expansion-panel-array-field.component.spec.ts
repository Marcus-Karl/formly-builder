import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelArrayFieldComponent } from './expansion-panel-array-field.component';

describe('ExpansionPanelArrayFieldComponent', () => {
  let component: ExpansionPanelArrayFieldComponent;
  let fixture: ComponentFixture<ExpansionPanelArrayFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionPanelArrayFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelArrayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
