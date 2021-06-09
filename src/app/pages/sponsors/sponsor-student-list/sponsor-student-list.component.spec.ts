import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorStudentListComponent } from './sponsor-student-list.component';

describe('SponsorStudentListComponent', () => {
  let component: SponsorStudentListComponent;
  let fixture: ComponentFixture<SponsorStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
