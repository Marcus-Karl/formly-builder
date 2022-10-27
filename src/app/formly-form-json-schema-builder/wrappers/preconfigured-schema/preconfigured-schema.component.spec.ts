import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconfiguredSchemaComponent } from './preconfigured-schema.component';

describe('PreconfiguredSchemaComponent', () => {
  let component: PreconfiguredSchemaComponent;
  let fixture: ComponentFixture<PreconfiguredSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreconfiguredSchemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreconfiguredSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
