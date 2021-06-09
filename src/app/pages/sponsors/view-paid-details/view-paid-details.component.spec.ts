import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaidDetailsComponent } from './view-paid-details.component';

describe('ViewPaidDetailsComponent', () => {
  let component: ViewPaidDetailsComponent;
  let fixture: ComponentFixture<ViewPaidDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaidDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
