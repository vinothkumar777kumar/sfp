import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeesStructureComponent } from './add-fees-structure.component';

describe('AddFeesStructureComponent', () => {
  let component: AddFeesStructureComponent;
  let fixture: ComponentFixture<AddFeesStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeesStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeesStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
