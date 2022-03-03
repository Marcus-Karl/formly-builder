import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideRuleEditorComponent } from './hide-rule-editor.component';

describe('HideRuleEditorComponent', () => {
  let component: HideRuleEditorComponent;
  let fixture: ComponentFixture<HideRuleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HideRuleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HideRuleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
