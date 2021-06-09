import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPendingApprovalListComponent } from './student-pending-approval-list.component';

describe('StudentPendingApprovalListComponent', () => {
  let component: StudentPendingApprovalListComponent;
  let fixture: ComponentFixture<StudentPendingApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPendingApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPendingApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
