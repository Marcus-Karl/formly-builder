import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerFormContainerComponent } from './inner-form-container.component';

describe('InnerFormComponent', () => {
  let component: InnerFormContainerComponent;
  let fixture: ComponentFixture<InnerFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
