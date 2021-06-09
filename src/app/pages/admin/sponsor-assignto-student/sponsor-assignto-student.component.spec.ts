import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorAssigntoStudentComponent } from './sponsor-assignto-student.component';

describe('SponsorAssigntoStudentComponent', () => {
  let component: SponsorAssigntoStudentComponent;
  let fixture: ComponentFixture<SponsorAssigntoStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorAssigntoStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorAssigntoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
