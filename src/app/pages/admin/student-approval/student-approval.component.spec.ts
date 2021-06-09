import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovalComponent } from './student-approval.component';

describe('StudentApprovalComponent', () => {
  let component: StudentApprovalComponent;
  let fixture: ComponentFixture<StudentApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
