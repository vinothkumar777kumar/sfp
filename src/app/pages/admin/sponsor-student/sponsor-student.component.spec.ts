import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorStudentComponent } from './sponsor-student.component';

describe('SponsorStudentComponent', () => {
  let component: SponsorStudentComponent;
  let fixture: ComponentFixture<SponsorStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
