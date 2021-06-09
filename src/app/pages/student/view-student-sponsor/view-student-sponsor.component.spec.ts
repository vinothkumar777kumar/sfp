import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentSponsorComponent } from './view-student-sponsor.component';

describe('ViewStudentSponsorComponent', () => {
  let component: ViewStudentSponsorComponent;
  let fixture: ComponentFixture<ViewStudentSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
