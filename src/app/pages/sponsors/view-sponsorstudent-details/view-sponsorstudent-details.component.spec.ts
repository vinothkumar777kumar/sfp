import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSponsorstudentDetailsComponent } from './view-sponsorstudent-details.component';

describe('ViewSponsorstudentDetailsComponent', () => {
  let component: ViewSponsorstudentDetailsComponent;
  let fixture: ComponentFixture<ViewSponsorstudentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSponsorstudentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSponsorstudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
