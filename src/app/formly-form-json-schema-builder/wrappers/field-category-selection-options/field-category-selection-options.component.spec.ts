import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCategorySelectionOptionsComponent } from './field-category-selection-options.component';

describe('CategorySelectionOptionsComponent', () => {
  let component: FieldCategorySelectionOptionsComponent;
  let fixture: ComponentFixture<FieldCategorySelectionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCategorySelectionOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCategorySelectionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
