import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconfiguredSchemaFieldsComponent } from './preconfigured-schema-fields.component';

describe('PreconfiguredSchemaFieldsComponent', () => {
  let component: PreconfiguredSchemaFieldsComponent;
  let fixture: ComponentFixture<PreconfiguredSchemaFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreconfiguredSchemaFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreconfiguredSchemaFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
