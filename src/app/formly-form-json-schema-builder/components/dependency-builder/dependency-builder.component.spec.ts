import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyBuilderComponent } from './dependency-builder.component';

describe('DependencyBuilderComponent', () => {
  let component: DependencyBuilderComponent;
  let fixture: ComponentFixture<DependencyBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependencyBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
