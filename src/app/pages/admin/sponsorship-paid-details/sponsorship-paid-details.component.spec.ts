import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipPaidDetailsComponent } from './sponsorship-paid-details.component';

describe('SponsorshipPaidDetailsComponent', () => {
  let component: SponsorshipPaidDetailsComponent;
  let fixture: ComponentFixture<SponsorshipPaidDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipPaidDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipPaidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
