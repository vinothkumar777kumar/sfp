import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentsDetailsComponent } from './view-students-details.component';

describe('ViewStudentsDetailsComponent', () => {
  let component: ViewStudentsDetailsComponent;
  let fixture: ComponentFixture<ViewStudentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
