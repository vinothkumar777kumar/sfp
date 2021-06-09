import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesStructureComponent } from './fees-structure.component';

describe('FeesStructureComponent', () => {
  let component: FeesStructureComponent;
  let fixture: ComponentFixture<FeesStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
