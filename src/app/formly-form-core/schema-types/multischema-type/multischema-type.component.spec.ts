import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultischemaTypeComponent } from './multischema-type.component';

describe('MultischemaTypeComponent', () => {
  let component: MultischemaTypeComponent;
  let fixture: ComponentFixture<MultischemaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultischemaTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultischemaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
